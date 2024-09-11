const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const { spawn } = require("child_process");
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function runPythonPoseSeq(scriptPath, args, callback) {
    const pythonProcess = spawn('python', [scriptPath].concat(args));
 
    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString(); 
    });
 
    pythonProcess.stderr.on('data', (error) => {
        console.error(`stderr: ${error}`);
    });
 
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(`Python script exited with code ${code}`);
            callback(`Error: Script exited with code ${code}`, null);
        } else {
            console.log('Python script executed successfully');
            callback(null, data);
        }
    });
}

const downloadVideo = (URL, retries = 3) => {
    return new Promise(async (resolve, reject) => {
        const video = ytdl(URL, { format: 'mp4' });
        const stream = fs.createWriteStream("src/models/videos/video.mp4");

        // Handle download progress
        video.on('progress', (chunkLength, downloaded, total) => {
            const percent = (downloaded / total * 100).toFixed(2);
            console.log(`Downloaded ${percent}% of the video.`);
        });

        video.pipe(stream);

        video.on('end', () => resolve("Download completed"));
        video.on('error', async (err) => {
            if (retries > 0) {
                console.log(`Retrying download... ${retries} attempts left`);
                await downloadVideo(URL, retries - 1);
            } else {
                reject(`Failed to download after multiple attempts: ${err.message}`);
            }
        });
    });
};

module.exports.getDownload = async (req, res) => {
    var URL = req.query.URL;

    try {
        await downloadVideo(URL);
        console.log(`Downloaded ${URL}!`);
    } catch (error) {
        res.status(500).send(error);
    }

    //res.send(`Downloaded ${URL}!`);
    await sleep(30000);

    runPythonPoseSeq("src/pose-sequence.py", [], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Pose sequence generation success!");
        }
    });
};