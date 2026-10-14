import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { parentMark } from '../content/brand';
import { HomePage } from '../pages/HomePage';
import { imageSize } from '../test/imageSize';
import { BrandLockup } from './BrandLockup';
import { SiteHeader } from './SiteHeader';

describe('chapter identity', () => {
  it('pairs the official GIVC artwork with a separate typeset descriptor', () => {
    const { container } = render(<BrandLockup tone="pink" />);
    expect(screen.getByRole('img', { name: 'Girls Into VC' })).toHaveAttribute('src', parentMark.pink);
    expect(container.querySelector('.brand-descriptor')?.textContent).toBe('at Columbia');
    expect(container.textContent).not.toMatch(/Girls Into VC/);
  });

  it('ends the descriptor with a decorative Columbia crown that takes the descriptor color', () => {
    const { container } = render(<BrandLockup tone="white" />);
    const crown = container.querySelector('.brand-descriptor > .brand-crown');
    expect(crown).toHaveAttribute('aria-hidden', 'true');
    expect(crown?.parentElement?.lastElementChild).toBe(crown);
    expect(existsSync(resolve(process.cwd(), 'public/images/brand/columbia-crown.png'))).toBe(true);
  });

  it('ships both logo files at the documented artwork size', () => {
    for (const src of [parentMark.pink, parentMark.white]) {
      const path = resolve(process.cwd(), 'public', src.slice(1));
      expect(existsSync(path)).toBe(true);
      expect(imageSize(path)).toEqual({ width: parentMark.width, height: parentMark.height });
    }
    const notes = readFileSync(resolve(process.cwd(), 'docs/asset-sources.md'), 'utf8');
    expect(notes).toContain('givc-logo-pink.png');
    expect(notes).toContain('givc-logo-white.png');
    expect(notes).toMatch(/monochrome/i);
  });

  it('names the full chapter in the Home heading using the white artwork', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', { level: 1, name: 'Girls Into VC at Columbia' });
    expect(heading.querySelector('img')).toHaveAttribute('src', parentMark.white);
  });

  it('uses the pink artwork on the light-pink header, including the Home opening', () => {
    const { unmount } = render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: 'Girls Into VC at Columbia home' });
    expect(link).toHaveAttribute('href', '/');
    expect(link.querySelector('img')).toHaveAttribute('src', parentMark.pink);
    unmount();

    render(
      <MemoryRouter>
        <SiteHeader overlay />
      </MemoryRouter>,
    );
    const overlayLink = screen.getByRole('link', { name: 'Girls Into VC at Columbia home' });
    expect(overlayLink).toHaveAttribute('href', '/');
    expect(overlayLink.querySelector('img')).toHaveAttribute('src', parentMark.pink);
  });
});
