# Imports
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import cv2
import numpy as np
import sys

# Initialising variables
model_path = "/models/pose_landmarker_lite.task"
BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Creating a pose landmarker instance with the video mode
options = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=model_path,
                             running_mode=VisionRunningMode.VIDEO)
)

# Turn the video frames into numpy arrays 
def videoToNumpy(path):
    frames = []
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    ret = True
    while ret:
        ret, img = cap.read() # reads one frame from the capture object
        if ret:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            frames.append(img)
    return np.stack(frames, axis=0), fps
            
# With initialised landmarker, generate coordinates based on video
def makePoseSequence(path):
    detector = vision.PoseLandmarker.create_from_options(options)
    np_video_arr, fps = videoToNumpy(path)
    mp_video = mp.Image(image_format=mp.ImageFormat.SRGB, data = np_video_arr)
    result = detector.detect_for_video(mp_video, fps)
    return result

# Execute code with path to video, getting it to the Node.js server
if __name__ == "__main__":
    path = str(sys.argv[1])
    print(makePoseSequence(path))
    sys.stdout.flush()
