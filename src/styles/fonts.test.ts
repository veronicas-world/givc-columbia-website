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
  it('self-hosts upright Alice and Lora font files', () => {
    const faces = fontFaces();
    expect(faces.map((face) => face.family)).toEqual(expect.arrayContaining(['Alice', 'Lora']));
    for (const face of faces) {
      expect(face.style).toBe('normal');
      const path = resolve(process.cwd(), 'public', face.url!.slice(1));
      expect(existsSync(path)).toBe(true);
      expect(readFileSync(path).subarray(0, 4).toString('latin1')).toBe('wOF2');
    }
  });

  it('uses Alice for headings and Lora for body text, never Times or italics', () => {
    expect(css).toMatch(/--font-heading:\s*'Alice'/);
    expect(css).toMatch(/--font-body:\s*'Lora'/);
    expect(css).toMatch(/h1,\s*h2,\s*h3\s*{[^}]*font-family:\s*var\(--font-heading\)/);
    expect(css).toMatch(/font-family:\s*var\(--font-body\)/);
    expect(css).not.toMatch(/Times/i);
    expect(css).not.toMatch(/font-style:\s*(italic|oblique)/);
  });

  it('uses the site heading font and sampled logo pink for navigation labels', () => {
    const navLinkStyles = /\.site-nav a\s*{([^}]*)}/.exec(css)?.[1] ?? '';
    expect(css).toMatch(/--logo-pink:\s*#f172a1/);
    expect(navLinkStyles).toMatch(/font-family:\s*var\(--font-heading\)/);
    expect(navLinkStyles).toMatch(/color:\s*var\(--logo-pink\)/);
  });
});
