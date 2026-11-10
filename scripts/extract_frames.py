"""
OpenCV frame-sequence extractor for the scroll-driven architectural film.

Reads boundary-matched video clips (v1.mp4..v4.mp4), samples 24 frames per clip
at 1280px width (JPEG quality 80), and drops the duplicate boundary frame on
clips 2..4 to produce 93 continuous frames: public/assets/seq/f000.jpg .. f092.jpg.

Usage:
    python scripts/extract_frames.py
"""

from __future__ import annotations

import glob
import os
import sys
from pathlib import Path

try:
    import cv2
except ImportError as exc:
    print(
        "ERROR: opencv-python (cv2) is required. Install with: pip install opencv-python",
        file=sys.stderr,
    )
    raise SystemExit(1) from exc


ROOT_DIR = Path(__file__).resolve().parent.parent
ASSETS_DIR = ROOT_DIR / "public" / "assets"
OUTPUT_DIR = ASSETS_DIR / "seq"

CLIPS = [
    ASSETS_DIR / "v1.mp4",
    ASSETS_DIR / "v2.mp4",
    ASSETS_DIR / "v3.mp4",
    ASSETS_DIR / "v4.mp4",
]

FRAMES_PER_CLIP = 24
TARGET_WIDTH = 1280
JPEG_QUALITY = 80


def extract_sequence() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for old_frame in glob.glob(str(OUTPUT_DIR / "f*.jpg")):
        os.remove(old_frame)

    idx = 0
    for clip_idx, clip_path in enumerate(CLIPS):
        if not clip_path.is_file():
            print(f"WARN: missing clip {clip_path}", file=sys.stderr)
            continue

        cap = cv2.VideoCapture(str(clip_path))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 0
        if total_frames <= 0:
            print(f"WARN: empty or unreadable clip {clip_path}", file=sys.stderr)
            cap.release()
            continue

        picks = [
            round(i * (total_frames - 1) / (FRAMES_PER_CLIP - 1))
            for i in range(FRAMES_PER_CLIP)
        ]

        # Drop the duplicated boundary frame at the start of clips 2..N
        if clip_idx > 0:
            picks = picks[1:]

        for frame_pos in picks:
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_pos)
            ok, frame = cap.read()
            if not ok or frame is None:
                continue

            height, width = frame.shape[:2]
            if width <= 0 or height <= 0:
                continue

            resized = cv2.resize(
                frame,
                (TARGET_WIDTH, round(height * TARGET_WIDTH / width)),
                interpolation=cv2.INTER_AREA,
            )
            out_path = OUTPUT_DIR / f"f{idx:03d}.jpg"
            cv2.imwrite(
                str(out_path),
                resized,
                [cv2.IMWRITE_JPEG_QUALITY, JPEG_QUALITY],
            )
            idx += 1

        cap.release()

    print(f"frames: {idx}")
    return idx


if __name__ == "__main__":
    count = extract_sequence()
    if count == 0:
        print(
            "No frames extracted — ScrollFilmSection will continue using the procedural 96-frame canvas fallback.",
            file=sys.stderr,
        )

