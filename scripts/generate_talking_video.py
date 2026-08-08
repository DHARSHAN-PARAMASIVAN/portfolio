from pathlib import Path
from gradio_client import Client, handle_file
import shutil

root = Path(r"c:\Users\DHARSH\Desktop\dharshan-portfolio")
video = root / "public" / "video" / "portrait-still.mp4"
audio = root / "public" / "audio" / "intro.mp3"
dest = root / "public" / "video" / "intro-talking.mp4"

print("Connecting to Wav2Lip space...")
client = Client("manavisrani07/gradio-lipsync-wav2lip")
print("Generating lip-sync video (this can take several minutes)...")
result = client.predict(
    handle_file(str(video)),
    handle_file(str(audio)),
    "wav2lip_gan",  # checkpoint
    0,  # no_smooth
    1,  # resize_factor (1 = full res quality)
    0,  # pad_top
    10,  # pad_bottom (helps chin/mouth)
    1,  # pad_left (API min 1)
    api_name="/generate",
)

print("raw result:", result)

path = None
if isinstance(result, dict):
    path = result.get("video") or result.get("path")
elif isinstance(result, (list, tuple)):
    path = result[0] if result else None
    if isinstance(path, dict):
        path = path.get("video") or path.get("path")
elif isinstance(result, str):
    path = result

if not path:
    raise SystemExit(f"No video path in result: {result!r}")

src = Path(path)
if not src.exists():
    raise SystemExit(f"Result file missing: {src}")

shutil.copy2(src, dest)
print("saved", dest, "bytes", dest.stat().st_size)
