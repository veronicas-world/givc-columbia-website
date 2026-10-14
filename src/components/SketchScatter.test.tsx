import { render, screen } from '@testing-library/react';
import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SketchScatter } from './SketchScatter';

describe('SketchScatter', () => {
  it('disperses all ten reference motifs in one footer-wide arrangement', () => {
    const { container } = render(<SketchScatter arrangement="footer" />);
    const sketches = [...container.querySelectorAll('img')];
    expect(sketches).toHaveLength(16);
    expect(new Set(sketches.map((sketch) => sketch.getAttribute('src'))).size).toBe(10);
    expect(container.querySelector('.sketch-scatter-footer')).toBeInTheDocument();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it.each(['garden', 'notes', 'playful'] as const)('scatters eight varied reference sketches in %s', (arrangement) => {
    const { container } = render(<SketchScatter arrangement={arrangement} />);
    const sketches = [...container.querySelectorAll('img')];
    expect(sketches).toHaveLength(8);
    expect(new Set(sketches.map((sketch) => sketch.getAttribute('src'))).size).toBe(8);
    for (const [index, sketch] of sketches.entries()) {
      expect(sketch).toHaveClass(`sketch-slot-${index + 1}`);
      expect(sketch).toHaveAttribute('alt', '');
      expect(sketch).toHaveAttribute('aria-hidden', 'true');
      expect(existsSync(`${process.cwd()}/public${sketch.getAttribute('src')}`)).toBe(true);
    }
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
