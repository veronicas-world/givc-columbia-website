import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { imageSize } from '../test/imageSize';
import { activityPhotos, allSitePhotos, homePhotos } from './photos';

const publicPath = (src: string) => resolve(process.cwd(), 'public', src.slice(1));

describe('site photography', () => {
  it('ships every photo locally with a maintainer source note', () => {
    const sourceNotes = readFileSync(resolve(process.cwd(), 'docs/asset-sources.md'), 'utf8');
    for (const photo of allSitePhotos) {
      expect(existsSync(publicPath(photo.src))).toBe(true);
      expect(sourceNotes).toContain(photo.src.split('/').pop());
      expect(photo.sourceNote.length).toBeGreaterThan(10);
      expect(photo.alt.length).toBeGreaterThan(10);
    }
  });

  it('records each file’s real intrinsic dimensions', () => {
    for (const photo of allSitePhotos) {
      expect(imageSize(publicPath(photo.src))).toEqual({ width: photo.width, height: photo.height });
    }
  });

  it('no longer uses the low-resolution screenshot crops', () => {
    for (const photo of allSitePhotos) {
      expect(photo.src).toMatch(/^\/images\/photos\//);
    }
    expect(existsSync(resolve(process.cwd(), 'public/images/chapter'))).toBe(false);
    expect(existsSync(resolve(process.cwd(), 'public/images/events'))).toBe(false);
  });

  it('keeps the supplied library-steps photo at its native size', () => {
    expect(homePhotos.librarySteps).toMatchObject({ width: 971, height: 507 });
    expect(imageSize(publicPath(homePhotos.librarySteps.src))).toEqual({ width: 971, height: 507 });
  });

  it('describes general photos without naming people or events', () => {
    for (const photo of activityPhotos) {
      expect(photo.alt).not.toMatch(/chapter|Columbia|[A-Z][a-z]+ [A-Z][a-z]+ (spoke|speaks)/);
      expect(photo.focus).toMatch(/^\d+% \d+%$/);
    }
  });
});
