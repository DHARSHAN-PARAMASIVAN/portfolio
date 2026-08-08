"""
Generate a talking intro video with Gemini Veo (image + prompt).
Requires: GEMINI_API_KEY in the environment (Google AI Studio).

Usage (PowerShell):
  $env:GEMINI_API_KEY = "your_key_here"
  python scripts/generate_talking_gemini.py
"""
from __future__ import annotations

import os
import time
from pathlib import Path

from google import genai
from google.genai import types

root = Path(__file__).resolve().parents[1]
img_path = root / "public" / "images" / "portrait-facing.png"
out_path = root / "public" / "video" / "intro-talking.mp4"
out_path.parent.mkdir(parents=True, exist_ok=True)

api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
if not api_key:
    raise SystemExit(
        "Missing GEMINI_API_KEY. Create one at https://aistudio.google.com/apikey "
        "then set $env:GEMINI_API_KEY before running this script."
    )

if not img_path.exists():
    raise SystemExit(f"Portrait missing: {img_path}")

PROMPT = """
Ultra realistic cinematic talking-head video of this exact person from the reference image.
He faces the camera, speaks naturally with accurate lip sync and subtle hand/shoulder gestures.
Keep the same face identity, hair, skin tone, and clothing as the photo.
Clean studio background, soft cinematic lighting, portrait framing (shoulders up).
He delivers this spoken intro in clear Indian English, calm and confident:

"Hello. I am Dharshan Paramasivan, a full-stack engineer focused on QA automation and API security.
I build systems, verify them with automation, harden the APIs that carry them, and ship work that survives production.
From Coimbatore, I am open to roles and collaborations. Welcome to my Signal Sheet."

Natural mouth movement matching every word. No text overlays, no logos, no watermarks.
""".strip()

client = genai.Client(api_key=api_key)

print("Uploading reference portrait...")
image_bytes = img_path.read_bytes()
image = types.Image(image_bytes=image_bytes, mime_type="image/png")

print("Starting Veo generation (may take a few minutes)...")
# Prefer Veo 3.1; fall back to fast variant if needed
model_ids = [
    "veo-3.1-generate-preview",
    "veo-3.1-fast-generate-preview",
    "veo-3.0-generate-preview",
]

operation = None
last_err: Exception | None = None
for model in model_ids:
    try:
        print(f"Trying model: {model}")
        operation = client.models.generate_videos(
            model=model,
            prompt=PROMPT,
            image=image,
            config=types.GenerateVideosConfig(
                aspect_ratio="9:16",
                number_of_videos=1,
            ),
        )
        break
    except Exception as e:  # noqa: BLE001
        last_err = e
        print(f"  failed: {e}")

if operation is None:
    raise SystemExit(f"All Veo models failed. Last error: {last_err}")

# Poll long-running operation
while not operation.done:
    print("…generating")
    time.sleep(12)
    operation = client.operations.get(operation)

response = operation.response
if not response or not getattr(response, "generated_videos", None):
    raise SystemExit(f"No video in response: {response!r}")

generated = response.generated_videos[0]
video = generated.video
# Download bytes
print("Downloading video…")
client.files.download(file=video)
video.save(str(out_path))
print(f"Saved {out_path} ({out_path.stat().st_size} bytes)")
