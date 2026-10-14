import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8');

function fontFaces() {
  return [...css.matchAll(/@font-face\s*{([^}]*)}/g)].map(([, body]) => ({
    family: /font-family:\s*'([^']+)'/.exec(body!)?.[1],
    style: /font-style:\s*(\w+)/.exec(body!)?.[1],
    url: /url\('([^']+)'\)/.exec(body!)?.[1],
  }));
}

describe('parent typography', () => {
  it('self-hosts upright Alice and Almarai font files', () => {
    const faces = fontFaces();
    expect(faces.map((face) => face.family)).toEqual(expect.arrayContaining(['Alice', 'Almarai']));
    for (const face of faces) {
      expect(face.style).toBe('normal');
      const path = resolve(process.cwd(), 'public', face.url!.slice(1));
      expect(existsSync(path)).toBe(true);
      expect(readFileSync(path).subarray(0, 4).toString('latin1')).toBe('wOF2');
    }
  });

  it('uses Alice for headings and Almarai for body text, never Times or italics', () => {
    expect(css).toMatch(/--font-heading:\s*'Alice'/);
    expect(css).toMatch(/--font-body:\s*'Almarai'/);
    expect(css).toMatch(/h1,\s*h2,\s*h3\s*{[^}]*font-family:\s*var\(--font-heading\)/);
    expect(css).toMatch(/font-family:\s*var\(--font-body\)/);
    expect(css).not.toMatch(/Times/i);
    expect(css).not.toMatch(/font-style:\s*(italic|oblique)/);
  });
});
