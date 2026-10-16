"""Build public/images/photos/landing-alma-mater.jpg from the supplied Alma Mater photo.

Steps: 4x Real-ESRGAN upscale, one perspective warp that levels the slight tilt and makes
Butler Library's columns vertical, then a crop centered on the statue.

Usage (needs torch, spandrel, Pillow and numpy, plus the RealESRGAN_x4plus.pth weights from
https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.1.0):

    python scripts/build-landing-photo.py path/to/RealESRGAN_x4plus.pth
"""

import sys
from pathlib import Path

import numpy as np
import torch
from PIL import Image
from spandrel import ModelLoader

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'design-preview/refresh-inputs/alma-mater-butler.jpeg'
OUTPUT = ROOT / 'public/images/photos/landing-alma-mater.jpg'
SCALE = 4
OUTPUT_WIDTH = 2400

# Measured on the 1024 x 683 original: centers of the outermost columns at two heights.
LEFT_COLUMN = ((104, 300), (69, 480))
RIGHT_COLUMN = ((894, 300), (940, 480))
# The cornice and the steps both sit about 0.46 degrees higher on the right.
TILT = 0.0081
# Statue axis: crown and pedestal centers on the original.
STATUE_AXIS = ((512, 265), (530, 660))


def upscale(image: Image.Image, weights: Path) -> Image.Image:
    device = 'mps' if torch.backends.mps.is_available() else 'cpu'
    model = ModelLoader().load_from_file(str(weights)).to(device).eval()
    pixels = torch.from_numpy(np.asarray(image, dtype=np.float32) / 255).permute(2, 0, 1)[None]
    _, _, height, width = pixels.shape
    out = torch.zeros(1, 3, height * SCALE, width * SCALE)
    tile, pad = 256, 16
    with torch.no_grad():
        for y in range(0, height, tile):
            for x in range(0, width, tile):
                y0, x0 = max(0, y - pad), max(0, x - pad)
                y1, x1 = min(height, y + tile + pad), min(width, x + tile + pad)
                result = model(pixels[:, :, y0:y1, x0:x1].to(device)).cpu()
                ty, tx = (y - y0) * SCALE, (x - x0) * SCALE
                th, tw = (min(y + tile, height) - y) * SCALE, (min(x + tile, width) - x) * SCALE
                out[:, :, y * SCALE:y * SCALE + th, x * SCALE:x * SCALE + tw] = result[:, :, ty:ty + th, tx:tx + tw]
    array = (out[0].clamp(0, 1).permute(1, 2, 0).numpy() * 255).round().astype(np.uint8)
    return Image.fromarray(array)


def line_x(line, y):
    (xa, ya), (xb, yb) = line
    return xa + (xb - xa) * (y - ya) / (yb - ya)


def homography(src, dst):
    """3x3 matrix H with dst ~ H @ src for four point pairs."""
    rows = []
    for (x, y), (u, v) in zip(src, dst):
        rows.append([x, y, 1, 0, 0, 0, -u * x, -u * y, -u])
        rows.append([0, 0, 0, x, y, 1, -v * x, -v * y, -v])
    _, _, vt = np.linalg.svd(np.array(rows, dtype=float))
    matrix = vt[-1].reshape(3, 3)
    return matrix / matrix[2, 2]


def apply(matrix, point):
    x, y, w = matrix @ np.array([point[0], point[1], 1.0])
    return x / w, y / w


def main(weights: Path):
    original = Image.open(SOURCE).convert('RGB')
    width, height = original.size

    # Both column lines become vertical at the x they reach at the bottom edge, so nothing at
    # the bottom is lost; right-hand targets are lowered by the tilt so horizontals come out level.
    left_x, right_x = line_x(LEFT_COLUMN, height), line_x(RIGHT_COLUMN, height)
    src = [LEFT_COLUMN[0], LEFT_COLUMN[1], RIGHT_COLUMN[0], RIGHT_COLUMN[1]]
    dst = [
        (left_x, LEFT_COLUMN[0][1]),
        (left_x, LEFT_COLUMN[1][1]),
        (right_x, RIGHT_COLUMN[0][1] + TILT * (RIGHT_COLUMN[0][0] - LEFT_COLUMN[0][0])),
        (right_x, RIGHT_COLUMN[1][1] + TILT * (RIGHT_COLUMN[1][0] - LEFT_COLUMN[1][0])),
    ]
    forward = homography(src, dst)

    big = upscale(original, weights)
    to_big = np.diag([SCALE, SCALE, 1.0])
    forward_big = to_big @ forward @ np.linalg.inv(to_big)
    inverse_big = np.linalg.inv(forward_big)
    coefficients = (inverse_big / inverse_big[2, 2]).flatten()[:8]
    size = big.size
    warped = big.transform(size, Image.PERSPECTIVE, tuple(coefficients), Image.BICUBIC)
    coverage = Image.new('L', size, 255).transform(size, Image.PERSPECTIVE, tuple(coefficients), Image.NEAREST)

    # Largest rectangle centered on the statue that has no empty warp margin.
    statue_x = np.mean([apply(forward_big, (x * SCALE, y * SCALE))[0] for x, y in STATUE_AXIS])
    mask = np.asarray(coverage) > 0
    full_rows = np.where(mask.all(axis=1))[0]
    valid = np.where(mask[full_rows].all(axis=0))[0] if len(full_rows) else np.arange(size[0])
    top, bottom = int(full_rows.min()), int(full_rows.max()) + 1
    half = int(min(statue_x - valid.min(), valid.max() + 1 - statue_x))
    left = int(round(statue_x)) - half
    cropped = warped.crop((left, top, left + 2 * half, bottom))

    final = cropped.resize((OUTPUT_WIDTH, round(cropped.height * OUTPUT_WIDTH / cropped.width)), Image.LANCZOS)
    final.save(OUTPUT, quality=82, optimize=True, progressive=True)
    print(f'statue x {statue_x:.0f} of {size[0]}, crop {cropped.size}, saved {final.size} to {OUTPUT}')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
