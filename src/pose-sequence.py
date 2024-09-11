# Imports
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import cv2
import pandas as pd

# Initialising variables
model_path = "src/models/pose_landmarker_lite.task"
BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Creating a pose landmarker instance with the video mode
options = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=model_path), 
    running_mode=VisionRunningMode.IMAGE)

## Turn the video frames into numpy arrays 

# def videoToNumpy(path):
#     frames = []
#     cap = cv2.VideoCapture(path)
#     fps = cap.get(cv2.CAP_PROP_FPS)
#     ret = True
#     while ret:
#         ret, img = cap.read() # reads one frame from the capture object
#         #print(ret)
#         if ret:
#             img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#             frames.append(img)
#             #print(img)
#     return np.stack(frames, axis=0), fps
            
## With initialised landmarker, generate coordinates based on video frames

# def makePoseSequence(path):
#     detector = vision.PoseLandmarker.create_from_options(options)
#     np_video_arr, fps = videoToNumpy(path)
#     mp_video = mp.Image(image_format=mp.ImageFormat.SRGB, data = np_video_arr)
#     result = detector.detect_for_video(mp_video, fps)
#     return result

def findPoseLandmarks(frame):
    detector = vision.PoseLandmarker.create_from_options(options)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data = frame)
    result = detector.detect(mp_image)
    return result

## Find pose landmarks for each frame of video

def processVideoPerFrame(path):
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
        poseLandmarks = findPoseLandmarks(frame)
        if poseLandmarks and poseLandmarks.pose_landmarks:
            landmark_list = []
            landmark_count = 1
            for landmark in poseLandmarks.pose_landmarks:
                frame_dict = {
                    "frame": frame_count,
                    "landmark": landmark_count,
                    "x": landmark[0].x,
                    "y": landmark[0].y,
                    "z": landmark[0].z,
                    "visibility": landmark[0].visibility
                }
                landmark_list.append(frame_dict)
            frame_df = pd.DataFrame(landmark_list)
            frames_df = pd.concat([frames_df, frame_df], ignore_index=True)


        frame_count += 1
    cap.release()
    return frames_df
    

# Execute code with path to video, getting it to the Node.js server
# if __name__ == "__main__":
#     path = str(sys.argv[1])
#     print(makePoseSequence(path))
#     sys.stdout.flush()

#print(makePoseSequence("src/models/videos/video.mp4"))


landmarkFile = open("src/models/landmarks_test.txt", "w")
landmark_db = processVideoPerFrame("src/models/videos/video.mp4")
landmarkFile.write(str(landmark_db.head()))
landmarkFile.write(f"\n {len(landmark_db)}")
landmarkFile.close()