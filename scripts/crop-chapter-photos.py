"""Rebuild chapter activity photos from the read-only "What We Do at GIVC" screenshot.

The four photographs on the chapter's Instagram slide are cropped inward so the
slide's rounded frames, captions, phone status bar and Instagram interface are
excluded. Crops are saved at their native size and never upscaled.

Usage: python3 scripts/crop-chapter-photos.py [screenshot-directory]
"""

import sys
from pathlib import Path

from PIL import Image

SOURCE_DIR = Path(sys.argv[1] if len(sys.argv) > 1 else Path.home() / "Desktop")
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images" / "chapter"
SOURCE = "IMG_6202.png"

# Boxes are (left, top, right, bottom) in the 1206x2622 original screenshot.
JOBS = {
    "speaker-event.jpg": (56, 822, 558, 1128),
    "workshop.jpg": (656, 820, 1160, 1130),
    "fellowship.jpg": (56, 1378, 558, 1718),
    "community.jpg": (654, 1378, 1160, 1720),
}


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE_DIR / SOURCE).convert("RGB")
    for out_name, box in JOBS.items():
        image = source.crop(box)
        image.save(OUT_DIR / out_name, "JPEG", quality=86, optimize=True, progressive=True)
        print(f"{out_name}: {image.width}x{image.height}")


if __name__ == "__main__":
    main()
