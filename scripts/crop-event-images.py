"""Rebuild event photo derivatives from the read-only Instagram screenshots.

Only the speaker photographs are kept. Phone status bars, Instagram chrome,
carousel counters, tag avatars, poster statistics and poster dates are cropped
out so the site never republishes metadata the archive treats as unconfirmed.

Usage: python3 scripts/crop-event-images.py [screenshot-directory]
"""

import sys
from pathlib import Path

from PIL import Image

SOURCE_DIR = Path(sys.argv[1] if len(sys.argv) > 1 else Path.home() / "Desktop")
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images" / "events"
INSET = 14
GAP = 16
BACKGROUND = (253, 236, 243)

# Boxes are (left, top, right, bottom) in the 1206x2622 original screenshots.
JOBS = {
    "avni-barman-genshe.jpg": ("IMG_6205.png", [[(31, 717, 781, 1600)]]),
    "women-investors-in-vc.jpg": (
        "IMG_6206.png",
        [
            [(98, 740, 586, 1048), (639, 740, 1122, 1048)],
            [(98, 1216, 586, 1526), (639, 1216, 1122, 1526)],
        ],
    ),
    "fireside-chat-vc-entrepreneurship.jpg": (
        "IMG_6207.png",
        [[(80, 835, 573, 1375), (620, 835, 1119, 1375)]],
    ),
}


def inset(box, amount):
    left, top, right, bottom = box
    return (left + amount, top + amount, right - amount, bottom - amount)


def build(source_name, rows):
    source = Image.open(SOURCE_DIR / source_name).convert("RGB")
    if len(rows) == 1 and len(rows[0]) == 1:
        return source.crop(rows[0][0])
    tiles = [[source.crop(inset(box, INSET)) for box in row] for row in rows]
    tile_w = min(tile.width for row in tiles for tile in row)
    tile_h = min(tile.height for row in tiles for tile in row)
    columns = max(len(row) for row in tiles)
    canvas = Image.new(
        "RGB",
        (columns * tile_w + (columns - 1) * GAP, len(tiles) * tile_h + (len(tiles) - 1) * GAP),
        BACKGROUND,
    )
    for r, row in enumerate(tiles):
        for c, tile in enumerate(row):
            canvas.paste(tile.crop((0, 0, tile_w, tile_h)), (c * (tile_w + GAP), r * (tile_h + GAP)))
    return canvas


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for out_name, (source_name, rows) in JOBS.items():
        image = build(source_name, rows)
        image.thumbnail((960, 960))
        image.save(OUT_DIR / out_name, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"{out_name}: {image.width}x{image.height}")


if __name__ == "__main__":
    main()
