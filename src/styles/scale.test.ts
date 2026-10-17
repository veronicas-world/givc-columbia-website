import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8');

describe('site-wide visual sizing', () => {
  it('keeps phones unscaled and applies 90% sizing on desktop', () => {
    expect(css).toMatch(/:root\s*{[^}]*--site-scale:\s*1;/);
    expect(css).toMatch(
      /@media \(min-width: 48rem\)\s*{\s*:root\s*{\s*--site-scale:\s*0\.9;\s*zoom:\s*var\(--site-scale\);/,
    );
  });

  it('compensates page and landing heights so they still fill the viewport', () => {
    expect(css.match(/min-height:\s*calc\(100vh \/ var\(--site-scale\)\);/g)).toHaveLength(3);
    expect(css).toMatch(/\.home-hero\s*{[^}]*min-height:\s*calc\(100svh \/ var\(--site-scale\)\);/);
  });
});
