import { readFileSync } from 'node:fs';

/** Reads intrinsic pixel dimensions from a PNG or baseline/progressive JPEG file. */
export function imageSize(path: string): { width: number; height: number } {
  const bytes = readFileSync(path);
  if (bytes.readUInt32BE(0) === 0x89504e47) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error(`Unsupported image format: ${path}`);
  let offset = 2;
  while (offset < bytes.length) {
    const marker = bytes[offset + 1]!;
    const length = bytes.readUInt16BE(offset + 2);
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isStartOfFrame) {
      return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }
  throw new Error(`No JPEG frame header found: ${path}`);
}
