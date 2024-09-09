const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const { spawn } = require("child_process");

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

module.exports.getDownload = (req, res) => {
    var URL = req.query.URL;
    res.send(`Downloaded ${URL}!`);

    ytdl(URL, {
        format: "mp4"
    }).pipe(fs.createWriteStream("src/models/videos/video.mp4"));

    runPythonPoseSeq("src/pose-sequence.py", ["src/models/videos/video.mp4"], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Pose sequence generation success!");
        }
    });
};