# Imports
import mediapipe as mp
from mediapipe.tasks.python import vision
import cv2
import pandas as pd

# Initialising variables
model_path = "src/models/pose_landmarker_lite.task"
BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode
all_landmark_names = ["nose", 
                  "inner left eye",
                  "left eye",
                  "outer left eye",
                  "inner right eye",
                  "right eye",
                  "outer right eye",
                  "left ear",
                  "right ear",
                  "left of mouth",
                  "right of mouth",
                  "left shoulder",
                  "right shoulder",
                  "left elbow",
                  "right elbow",
                  "left wrist",
                  "right wrist",
                  "left pinky",
                  "right pinky",
                  "left index",
                  "right index",
                  "left thumb",
                  "right thumb",
                  "left hip",
                  "right hip",
                  "left knee",
                  "right knee",
                  "left ankle",
                  "right ankle",
                  "left heel",
                  "right heel",
                  "left foot index",
                  "right foot index"
                  ]
video_path = "src/models/videos/video.mp4"
landmark_path = "src/models/landmarks_test.txt"

# Creating a pose landmarker instance with the video mode
options = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=model_path), 
    running_mode=VisionRunningMode.IMAGE)

## With initialised landmarker, generate coordinates based on video frames

def find_pose_landmarks(frame):
    detector = vision.PoseLandmarker.create_from_options(options)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data = frame)
    result = detector.detect(mp_image)
    return result

## Find pose landmarks for each frame of video

def process_video_per_frame(path):
    # Initialise local variables
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    ret = True
    frame_count = 0
    
    frames_df = pd.DataFrame()

    # Loop over each frame
    while ret:
        ret, frame = cap.read()
        if not ret:
            break

        # Convert the frame to RGB
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Run pose detection on current frame
        frame_landmarks = find_pose_landmarks(frame)
        if frame_landmarks and frame_landmarks.pose_landmarks:
            landmark_list = []
            landmark_count = 0
            player1_list = frame_landmarks.pose_landmarks[0]
            for landmark in player1_list:
                frame_dict = {
                    "frame": frame_count,
                    "landmark": all_landmark_names[landmark_count],
                    "x": landmark.x,
                    "y": landmark.y,
                    "z": landmark.z,
                    "visibility": landmark.visibility
                }
                landmark_list.append(frame_dict)
                landmark_count += 1
            frame_df = pd.DataFrame(landmark_list)
            frames_df = pd.concat([frames_df, frame_df], ignore_index=True)

        frame_count += 1
    cap.release()
    return frames_df
    

## Execute code with path to video

landmark_file = open(landmark_path, "w")
landmark_db = process_video_per_frame(video_path)
landmark_file.write(landmark_db.to_string())
landmark_file.write(f"\n {len(landmark_db)}")
landmark_file.close()