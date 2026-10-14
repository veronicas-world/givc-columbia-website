import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { chapterActivityPhotos, homePhotos } from './photos';

const allPhotos = [homePhotos.campus, homePhotos.community, ...chapterActivityPhotos];

describe('site photography', () => {
  it('ships every photo locally with a source note', () => {
    const sourceNotes = readFileSync(resolve(process.cwd(), 'docs/asset-sources.md'), 'utf8');
    for (const photo of allPhotos) {
      expect(existsSync(resolve(process.cwd(), 'public', photo.src.slice(1)))).toBe(true);
      expect(sourceNotes).toContain(photo.src.split('/').pop());
      expect(photo.alt.length).toBeGreaterThan(10);
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it('labels the parent-network photo as not a Columbia chapter event', () => {
    expect(homePhotos.community.context).toBe('parent');
    expect(homePhotos.community.credit).toMatch(/not a Columbia chapter event/);
  });

  it('marks the four activity photos as chapter photos', () => {
    expect(chapterActivityPhotos.map((photo) => photo.label)).toEqual([
      'Speaker events',
      'Workshops',
      'Fellowship',
      'Community',
    ]);
    for (const photo of chapterActivityPhotos) {
      expect(photo.context).toBe('chapter');
    }
  });
});
