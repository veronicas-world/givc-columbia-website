"""Rebuild the shipped brand and photo derivatives from their preserved originals.

Originals are only read. Sources and URLs are listed in docs/asset-sources.md.

Usage: python3 scripts/build-refresh-assets.py <official-originals-dir>
The directory holds the downloaded official files 606A6532.jpg, 606A6646.jpg,
606A9109.jpg and official-header-logo.png (the transparent GIVC mark).
"""

import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
INPUTS = ROOT / "design-preview" / "refresh-inputs"
BRAND = ROOT / "public" / "images" / "brand"
PHOTOS = ROOT / "public" / "images" / "photos"


def resize_to_width(image: Image.Image, width: int) -> Image.Image:
    if image.width <= width:
        return image
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.LANCZOS)


def save_jpeg(image: Image.Image, path: Path) -> None:
    image.convert("RGB").save(path, "JPEG", quality=84, optimize=True, progressive=True)
    print(f"{path.relative_to(ROOT)} {image.width}x{image.height}")


def build_logos(originals: Path) -> None:
    mark = Image.open(originals / "official-header-logo.png").convert("RGBA")
    left, top, right, bottom = mark.getbbox()
    pad = 4
    mark = mark.crop((left - pad, top - pad, right + pad, bottom + pad))
    mark.save(BRAND / "givc-logo-pink.png", optimize=True)
    # White monochrome treatment for the pink opening: colour replaced, alpha kept.
    white = Image.new("RGBA", mark.size, (255, 255, 255, 0))
    white.putalpha(mark.getchannel("A"))
    white.save(BRAND / "givc-logo-white.png", optimize=True)
    print(f"brand logos {mark.width}x{mark.height}")


def build_photos(originals: Path) -> None:
    # Supplied at native size; copied byte for byte so no detail is invented.
    shutil.copyfile(INPUTS / "low-library-steps.jpeg", PHOTOS / "low-library-steps.jpg")
    shutil.copyfile(INPUTS / "community-coffee.jpeg", PHOTOS / "community-conversation.jpg")

    group = Image.open(originals / "606A6532.jpg")
    save_jpeg(resize_to_width(group, 2000), PHOTOS / "girls-into-vc-community.jpg")

    # Left of the frame only: the projected slide on the right names people.
    panel = Image.open(originals / "606A6646.jpg").crop((0, 375, 1340, 1667))
    save_jpeg(panel, PHOTOS / "panel-discussion.jpg")

    registration = Image.open(originals / "606A9109.jpg")
    save_jpeg(resize_to_width(registration, 1600), PHOTOS / "registration-table.jpg")


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    originals = Path(sys.argv[1])
    BRAND.mkdir(parents=True, exist_ok=True)
    PHOTOS.mkdir(parents=True, exist_ok=True)
    build_logos(originals)
    build_photos(originals)


if __name__ == "__main__":
    main()
