import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('frames one accessible page title with the ten existing reference motifs', () => {
    const { container } = render(
      <PageHeader title="Executive Board"><p>Meet the chapter.</p></PageHeader>,
    );
    const title = screen.getByRole('heading', { level: 1, name: 'Executive Board' });
    expect(title.closest('header')).toHaveClass('page-header', 'sketch-section');
    expect(screen.getByText('Meet the chapter.')).toBeInTheDocument();
    const sketches = [...container.querySelectorAll('.sketch-scatter-title img')];
    expect(sketches).toHaveLength(10);
    expect(new Set(sketches.map((sketch) => sketch.getAttribute('src'))).size).toBe(10);
    for (const sketch of sketches) {
      expect(sketch).toHaveAttribute('alt', '');
      expect(sketch).toHaveAttribute('aria-hidden', 'true');
      expect(existsSync(resolve(process.cwd(), 'public', sketch.getAttribute('src')!.slice(1)))).toBe(true);
    }
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('does not add an empty description for title-only pages', () => {
    const { container } = render(<PageHeader title="About" />);
    expect(container.querySelector('.page-lede')).toBeNull();
  });
});
