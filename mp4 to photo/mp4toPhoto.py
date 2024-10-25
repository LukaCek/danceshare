import cv2
import os
from datetime import datetime

def extract_frames(video_path, output_folder, frame_interval=1):
    """
    Extract frames from a video file and save them as images.
    
    Parameters:
    video_path (str): Path to the input video file
    output_folder (str): Path to the folder where frames will be saved
    frame_interval (int): Extract every nth frame (default=1)
    
    Returns:
    int: Number of frames extracted
    """
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Open the video file
    video = cv2.VideoCapture(video_path)
    
    # Get video properties
    fps = video.get(cv2.CAP_PROP_FPS)
    total_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Initialize counters
    frame_count = 0
    saved_count = 0
    
    print(f"Video FPS: {fps}")
    print(f"Total frames: {total_frames}")
    
    while True:
        # Read the next frame
        success, frame = video.read()
        
        if not success:
            break
        
        # Save frame at specified interval
        if frame_count % frame_interval == 0:
            # Generate filename with timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"frame_{timestamp}_{frame_count:06d}.jpg"
            output_path = os.path.join(output_folder, filename)
            
            # Save the frame as an image
            cv2.imwrite(output_path, frame)
            saved_count += 1
            
            # Print progress
            if saved_count % 100 == 0:
                print(f"Saved {saved_count} frames...")
        
        frame_count += 1
    
    # Clean up
    video.release()
    print(f"\nExtraction complete!")
    print(f"Total frames processed: {frame_count}")
    print(f"Frames saved: {saved_count}")
    
    return saved_count

if __name__ == "__main__":
    # Example usage
    video_path = "1.mp4"
    output_folder = "extracted_frames"
    
    # Extract every 30th frame (adjust this value based on your needs)
    frames_saved = extract_frames(video_path, output_folder, frame_interval=30)