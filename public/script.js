"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const demosSection = document.getElementById("demos");
let poseLandmarker = undefined;
let runningMode = "IMAGE";
let enableWebcamButton;
let webcamRunning = false;
const videoHeight = "360px";
const videoWidth = "480px";
// Before we can use PoseLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createPoseLandmarker = () => __awaiter(void 0, void 0, void 0, function* () {
    const vision = yield tasks_vision_1.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
    poseLandmarker = yield tasks_vision_1.PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
            delegate: "GPU"
        },
        runningMode: runningMode,
        numPoses: 2
    });
    demosSection.classList.remove("invisible");
});
createPoseLandmarker();
/********************************************************************
// Demo 1: Grab a bunch of images from the page and detection them
// upon click.
********************************************************************/
// In this demo, we have put all our clickable images in divs with the
// CSS class 'detectionOnClick'. Lets get all the elements that have
// this class.
const imageContainers = document.getElementsByClassName("detectOnClick");
// Now let's go through all of these and add a click event listener.
for (let i = 0; i < imageContainers.length; i++) {
    // Add event listener to the child element whichis the img element.
    imageContainers[i].children[0].addEventListener("click", handleClick);
}
// When an image is clicked, let's detect it and display results!
function handleClick(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!poseLandmarker) {
            console.log("Wait for poseLandmarker to load before clicking!");
            return;
        }
        // if (runningMode === "VIDEO") {
        //   runningMode = "IMAGE";
        //   await poseLandmarker.setOptions({ runningMode: "IMAGE" });
        // }
        // Remove all landmarks drawed before
        const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
        for (var i = allCanvas.length - 1; i >= 0; i--) {
            const n = allCanvas[i];
            n.parentNode.removeChild(n);
        }
        // We can call poseLandmarker.detect as many times as we like with
        // different image data each time. The result is returned in a callback.
        poseLandmarker.detect(event.target, (result) => {
            const canvas = document.createElement("canvas");
            canvas.setAttribute("class", "canvas");
            canvas.setAttribute("width", event.target.naturalWidth + "px");
            canvas.setAttribute("height", event.target.naturalHeight + "px");
            canvas.style.cssText =
                "left: 0px;" +
                    "top: 0px;" +
                    "width: " +
                    event.target.width +
                    "px;" +
                    "height: " +
                    event.target.height +
                    "px;";
            event.target.parentNode.appendChild(canvas);
            const canvasCtx = canvas.getContext("2d");
            const drawingUtils = new tasks_vision_1.DrawingUtils(canvasCtx);
            for (const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                    radius: (data) => tasks_vision_1.DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
                });
                drawingUtils.drawConnectors(landmark, tasks_vision_1.PoseLandmarker.POSE_CONNECTIONS);
            }
        });
    });
}
