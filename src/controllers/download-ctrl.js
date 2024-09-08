const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let poseLandmarker = undefined;
let runningMode = "VIDEO";

const createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks("../../node_modules/@mediapipe/tasks-vision/wasm");
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `/js/pose_landmarker_lite.task`,
            delegate: "GPU"
        },
        runningMode: runningMode,
        numPoses: 2
    });
}

createPoseLandmarker();



module.exports.getDownload = (req, res) => {
    var URL = req.query.URL;
    res.send(`Downloaded ${URL}!`);
    
    ytdl(URL, {
        format: "mp4"
    }).pipe(fs.createWriteStream("src/models/videos/video.mp4"));
};