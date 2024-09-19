### Module for:
###    - Putting real-time data into a pandas dataframe
###    - Cleaning up both pandas databases

## Imports
import pandas as pd

## Initialise variables
realtime_txt_path = "src/models/realtime_landmarks.txt"

## Function to turn a text file into a pandas dataframe, returns said dataframe
def txt_to_pandas(path):
    # Initialise file opening
    realtime_file = open(realtime_txt_path, "r")
    
    
    return