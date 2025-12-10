import { Input, BlobSource, ALL_FORMATS } from "mediabunny";

export const getVideoMetadata = async (file) => {
  try {
    const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });

    // Get duration in seconds
    const durationInSeconds = await input.computeDuration();

    // Get dimensions if possible, defaulting if not
    let width = 1080;
    let height = 1920;

    try {
      const videoTrack = await input.getPrimaryVideoTrack();
      if (videoTrack) {
        // Handle rotation metadata often present in mobile videos
        if (videoTrack.rotation === 90 || videoTrack.rotation === 270) {
          width = videoTrack.displayHeight;
          height = videoTrack.displayWidth;
        } else {
          width = videoTrack.displayWidth;
          height = videoTrack.displayHeight;
        }
      }
    } catch (e) {
      console.warn("Could not read video dimensions, using defaults", e);
    }

    return {
      durationInSeconds,
      width,
      height
    };
  } catch (error) {
    console.error("Error reading video metadata:", error);
    // Fallback for when mediabunny might fail or unsupported format
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve({
          durationInSeconds: video.duration,
          width: video.videoWidth,
          height: video.videoHeight
        });
      };
      video.onerror = () => {
        reject("Failed to load video");
      };
      video.src = URL.createObjectURL(file);
    });
  }
};

export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};