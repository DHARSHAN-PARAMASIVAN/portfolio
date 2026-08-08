from pathlib import Path
import cv2
from mutagen.mp3 import MP3

root = Path(r"c:\Users\DHARSH\Desktop\dharshan-portfolio")
img_path = root / "public" / "images" / "portrait-facing.png"
audio_path = root / "public" / "audio" / "intro.mp3"
out_dir = root / "public" / "video"
out_dir.mkdir(parents=True, exist_ok=True)
still_video = out_dir / "portrait-still.mp4"

duration = MP3(str(audio_path)).info.length
print("audio_duration", duration)

img = cv2.imread(str(img_path))
if img is None:
    raise SystemExit("failed to read image")

h, w = img.shape[:2]
scale = 720 / max(h, w)
if scale < 1:
    img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
h, w = img.shape[:2]
w -= w % 2
h -= h % 2
img = img[:h, :w]

fps = 25
frames = max(1, int(duration * fps) + 5)
fourcc = cv2.VideoWriter_fourcc(*"mp4v")
writer = cv2.VideoWriter(str(still_video), fourcc, fps, (w, h))
for _ in range(frames):
    writer.write(img)
writer.release()
print("wrote", still_video, "frames", frames, "size", still_video.stat().st_size)
