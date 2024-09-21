"use client"

import { PoseLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

import React, { useEffect, useRef, useState } from "react";


export default function Play() {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [poseLandmarker, setPoseLandmarker] = useState(null);
    const [ctx, setCtx] = useState(null);
    const [webcamRunning, setWebcamRunning] = useState(false);

    useEffect(() => {
        const initializePoseLandmarker = async () => {
          try {
            const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
            const poseLandmarkerInstance = await PoseLandmarker.createFromOptions(filesetResolver, {
                baseOptions: { 
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`, 
                    delegate: "GPU" 
                },
                runningMode: "VIDEO",
                numPoses: 1,
            });
            setPoseLandmarker(poseLandmarkerInstance);
            // Initialize canvas context
            if (canvasRef.current) {
              const context = canvasRef.current.getContext("2d");
              setCtx(context);
            }
          } catch (error) {
            console.error("Error initializing PoseLandmarker:", error);
          }
        };
        initializePoseLandmarker();
    }, []);

    useEffect(() => {
        const detectPoses = async () => {
            if (poseLandmarker && ctx && webcamRunning) {
              const detect = async () => {
                if (!videoRef.current) return;
                console.log(videoRef.current.videoWidth);
                console.log(videoRef.current.videoHeight);
                console.log(canvasRef.current.width);
                console.log(canvasRef.current.height);
                const results = poseLandmarker.detectForVideo(videoRef.current, performance.now());
                console.log(results.landmarks);
                // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                if (results.landmarks) {
                  // results.poseLandmarks.forEach((landmarks) => {
                  //   landmarks.forEach(({ x, y }) => {
                  //     ctx.beginPath();
                  //     ctx.arc(x * canvasRef.current.width, y * canvasRef.current.height, 2, 0, Math.PI * 2);
                  //     ctx.fillStyle = "#FFFFFF";
                  //     ctx.fill();
                  //   });
                  // });
                  
                }
                requestAnimationFrame(detect);
              };
              detect();
            }
          };



        if (poseLandmarker) {
            const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;     
                setWebcamRunning(true);

                videoRef.current.addEventListener("loadeddata", () => {
                    console.log("Video data loaded, starting detection...");
                    videoRef.current.play();
                    detectPoses(); // Start the detection loop
                  });
            } catch (err) {
                console.error("Error accessing webcam:", err);
            }
            };
            startWebcam();
        }
    }, [poseLandmarker, ctx, webcamRunning]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            <h1></h1>
            <video ref={videoRef} width="640" height="480" autoplay playsinline/>
            <canvas ref={canvasRef} width="640" height="480" />
        </div>
    );
}
