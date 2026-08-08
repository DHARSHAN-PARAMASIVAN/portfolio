"""
Generate a talking-portrait MP4 by warping the mouth region from audio amplitude,
then muxing the voiceover track. Uses OpenCV + imageio-ffmpeg (no cloud API).
"""
from __future__ import annotations

from pathlib import Path
import math
import struct
import subprocess
import wave

import cv2
import imageio.v2 as imageio
import imageio_ffmpeg
import numpy as np
from mutagen.mp3 import MP3

root = Path(r"c:\Users\DHARSH\Desktop\dharshan-portfolio")
img_path = root / "public" / "images" / "portrait-facing.png"
audio_mp3 = root / "public" / "audio" / "intro.mp3"
out_dir = root / "public" / "video"
out_dir.mkdir(parents=True, exist_ok=True)
silent_mp4 = out_dir / "intro-talking-silent.mp4"
final_mp4 = out_dir / "intro-talking.mp4"
wav_path = out_dir / "intro.wav"

# Decode mp3 -> wav via imageio-ffmpeg
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.check_call(
    [ffmpeg, "-y", "-i", str(audio_mp3), "-ac", "1", "-ar", "16000", str(wav_path)],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

with wave.open(str(wav_path), "rb") as wf:
    sr = wf.getframerate()
    n = wf.getnframes()
    raw = wf.readframes(n)
    audio = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0

duration = len(audio) / sr
fps = 25
frame_count = int(duration * fps)

img = cv2.imread(str(img_path))
if img is None:
    raise SystemExit("cannot read portrait")

# Face detect for mouth ROI
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
faces = cascade.detectMultiScale(gray, 1.1, 5, minSize=(120, 120))
h, w = img.shape[:2]
if len(faces):
    x, y, fw, fh = max(faces, key=lambda f: f[2] * f[3])
else:
    # fallback: center portrait guess
    x, y, fw, fh = int(w * 0.28), int(h * 0.18), int(w * 0.44), int(h * 0.52)

# Mouth band in lower face
mx = x + int(fw * 0.18)
my = y + int(fh * 0.62)
mw = int(fw * 0.64)
mh = int(fh * 0.28)
mx = max(0, mx)
my = max(0, my)
mw = min(mw, w - mx)
mh = min(mh, h - my)
mouth = img[my : my + mh, mx : mx + mw].copy()

def amp_at(t: float) -> float:
    i0 = int(t * sr)
    win = audio[i0 : i0 + int(0.04 * sr)]
    if win.size == 0:
        return 0.0
    rms = float(np.sqrt(np.mean(win * win)))
    # speech emphasis
    return float(min(1.0, (rms * 6.5) ** 0.85))

writer = imageio.get_writer(
    str(silent_mp4),
    fps=fps,
    codec="libx264",
    quality=8,
    pixelformat="yuv420p",
    macro_block_size=1,
)

base = img.copy()
for fi in range(frame_count):
    t = fi / fps
    a = amp_at(t)
    # subtle head sway / nod
    sway = int(math.sin(t * 2.2) * 2 + math.sin(t * 0.7) * 1)
    nod = int(a * 3)
    frame = np.roll(base, sway, axis=1)
    frame = np.roll(frame, nod, axis=0)

    # jaw open: vertical stretch of mouth ROI
    open_amt = 1.0 + a * 0.55
    new_h = max(2, int(mh * open_amt))
    warped = cv2.resize(mouth, (mw, new_h), interpolation=cv2.INTER_LINEAR)
    # paste centered on original mouth box, clipped
    y0 = my - int((new_h - mh) * 0.35)
    y1 = y0 + new_h
    x0, x1 = mx, mx + mw
    # clip to frame
    src_y0 = max(0, -y0)
    src_y1 = warped.shape[0] - max(0, y1 - h)
    dst_y0 = max(0, y0)
    dst_y1 = min(h, y1)
    if src_y1 > src_y0 and dst_y1 > dst_y0:
        patch = warped[src_y0:src_y1, :]
        # feather blend
        alpha = np.linspace(0.35, 1.0, patch.shape[0], dtype=np.float32)[:, None, None]
        alpha = np.repeat(alpha, 3, axis=2)
        roi = frame[dst_y0:dst_y1, x0:x1].astype(np.float32)
        blended = roi * (1 - alpha) + patch.astype(np.float32) * alpha
        frame[dst_y0:dst_y1, x0:x1] = blended.astype(np.uint8)

        # dark mouth cavity for open frames
        if a > 0.12:
            cy = dst_y0 + int(patch.shape[0] * 0.45)
            cx = x0 + mw // 2
            axes = (max(2, int(mw * 0.16 * (0.4 + a))), max(1, int(mh * 0.12 * a * 3)))
            overlay = frame.copy()
            cv2.ellipse(overlay, (cx, cy), axes, 0, 0, 360, (20, 12, 10), -1)
            frame = cv2.addWeighted(overlay, min(0.55, a * 0.7), frame, 1 - min(0.55, a * 0.7), 0)

    # RGB for imageio
    writer.append_data(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

writer.close()
print("silent video", silent_mp4, silent_mp4.stat().st_size)

# Mux audio
subprocess.check_call(
    [
        ffmpeg,
        "-y",
        "-i",
        str(silent_mp4),
        "-i",
        str(audio_mp3),
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-shortest",
        "-movflags",
        "+faststart",
        str(final_mp4),
    ],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)
print("final", final_mp4, final_mp4.stat().st_size)
