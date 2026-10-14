import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { imageSize } from '../test/imageSize';
import { networkGraphics, networkStats } from './network';

describe('parent-network content', () => {
  it('uses the clear homepage impact figures without inventing a definition for 150', () => {
    expect(networkStats).toEqual([
      { value: '6', label: 'continents' },
      { value: '24', label: 'campus chapters' },
      { value: '75', label: 'countries' },
      { value: '10k', label: 'members' },
    ]);
  });

  it('ships the official partner and recognition graphics with documented provenance', () => {
    const notes = readFileSync(resolve(process.cwd(), 'docs/asset-sources.md'), 'utf8');
    for (const graphic of Object.values(networkGraphics)) {
      const path = resolve(process.cwd(), 'public', graphic.src.slice(1));
      expect(existsSync(path)).toBe(true);
      expect(imageSize(path)).toEqual({ width: graphic.width, height: graphic.height });
      expect(notes).toContain(graphic.src.split('/').pop());
      expect(graphic.alt).toMatch(/parent/i);
    }
    expect(notes).toMatch(/150.*members/);
  });
});
