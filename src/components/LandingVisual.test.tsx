import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { MemoryRouter } from 'react-router-dom';
import { act, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { parentMark } from '../content/brand';
import { LandingMark } from './LandingMark';
import { LandingVisual } from './LandingVisual';
import { SiteHeader } from './SiteHeader';

let reduced = false;
let listeners: Set<(event: MediaQueryListEvent) => void>;

function changeReducedMotion(next: boolean) {
  reduced = next;
  act(() => {
    for (const listener of [...listeners]) listener({ matches: next } as MediaQueryListEvent);
  });
}

describe('landing visual', () => {
  beforeEach(() => {
    reduced = false;
    listeners = new Set();
    vi.stubGlobal('IntersectionObserver', class {});
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      get matches() { return reduced; },
      addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
      removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    })));
  });

  afterEach(() => vi.unstubAllGlobals());

  it('keeps the authentic logo and full chapter name accessible throughout the intro', () => {
    const { container } = render(<LandingVisual />);
    const heading = screen.getByRole('heading', { level: 1, name: 'Girls Into VC at Columbia' });
    expect(within(heading).getByRole('img', { name: parentMark.alt })).toHaveAttribute('src', parentMark.white);
    expect(container.querySelector('.home-hero-scene')).toHaveAttribute('data-landing-motion', 'intro');
    expect(container.querySelector('.landing-mark')).toHaveAttribute('data-mark-motion', 'intro');
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('svg')).toHaveAttribute('focusable', 'false');
    expect(container.querySelector('svg image')).toHaveAttribute('href', parentMark.white);
    expect(container.querySelector('feFlood')).toHaveAttribute('flood-color', 'var(--white)');
    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(container.querySelector('[aria-live]')).toBeNull();
  });

  it('sends every sketch beyond the viewport rather than leaving it at the edges', () => {
    const { container } = render(<LandingVisual />);
    for (const piece of container.querySelectorAll<HTMLElement>('.landing-piece')) {
      const x = piece.style.getPropertyValue('--piece-exit-x');
      const y = piece.style.getPropertyValue('--piece-exit-y');
      expect(x).toMatch(/vw$/);
      expect(y).toMatch(/vh$/);
      expect(Math.max(Math.abs(parseFloat(x)), Math.abs(parseFloat(y)))).toBeGreaterThanOrEqual(120);
    }
  });

  it('uses all ten real brand motifs rather than invented triangles', () => {
    const { container } = render(<LandingVisual />);
    const decorative = container.querySelector('.landing-pieces')!;
    expect(decorative).toHaveAttribute('aria-hidden', 'true');
    const images = [...decorative.querySelectorAll('img')];
    expect(images.map((image) => image.getAttribute('src'))).toEqual([
      'sprig', 'ribbon', 'dots', 'rays', 'star', 'sparkles', 'leaves', 'loop', 'zigzag', 'splash',
    ].map((kind) => `/images/sketches/${kind}.png`));
    for (const image of images) {
      expect(image).toHaveAttribute('alt', '');
      expect(existsSync(resolve(process.cwd(), 'public', image.getAttribute('src')!.slice(1)))).toBe(true);
    }
    expect(screen.getAllByRole('img')).toHaveLength(1);
    for (const piece of decorative.querySelectorAll<HTMLElement>('.landing-piece')) {
      // The blank opening and 2.5-second flight still finish before five seconds.
      expect(parseFloat(piece.style.getPropertyValue('--piece-delay')) + 2.5).toBeLessThan(5);
    }
  });

  it('shows the final graphic immediately when reduced motion is requested', () => {
    reduced = true;
    const { container } = render(<LandingVisual />);
    expect(container.querySelector('.home-hero-scene')).toHaveAttribute('data-landing-motion', 'static');
    expect(container.querySelector('.landing-mark')).toHaveAttribute('data-mark-motion', 'static');
    expect(screen.getByRole('heading', { name: 'Girls Into VC at Columbia' })).toBeInTheDocument();
  });

  it('runs the delayed menu reveal only over the Home opening', () => {
    const { container, unmount } = render(<MemoryRouter><SiteHeader overlay /></MemoryRouter>);
    expect(container.querySelector('header')).toHaveAttribute('data-home-intro', 'running');
    unmount();
    const standard = render(<MemoryRouter><SiteHeader /></MemoryRouter>);
    expect(standard.container.querySelector('header')).toHaveAttribute('data-home-intro', 'static');
  });

  it('shows the menu immediately for reduced motion and never restarts its reveal', () => {
    reduced = true;
    const { container, unmount } = render(<MemoryRouter><SiteHeader overlay /></MemoryRouter>);
    expect(container.querySelector('header')).toHaveAttribute('data-home-intro', 'static');
    unmount();
    reduced = false;
    const live = render(<MemoryRouter><SiteHeader overlay /></MemoryRouter>);
    expect(live.container.querySelector('header')).toHaveAttribute('data-home-intro', 'running');
    changeReducedMotion(true);
    changeReducedMotion(false);
    expect(live.container.querySelector('header')).toHaveAttribute('data-home-intro', 'static');
  });

  it('settles mid-intro and never replays when reduced motion is turned back off', () => {
    const { container } = render(<LandingVisual />);
    expect(listeners.size).toBe(2);
    changeReducedMotion(true);
    expect(container.querySelector('.home-hero-scene')).toHaveAttribute('data-landing-motion', 'static');
    expect(container.querySelector('.landing-mark')).toHaveAttribute('data-mark-motion', 'static');
    changeReducedMotion(false);
    expect(container.querySelector('.home-hero-scene')).toHaveAttribute('data-landing-motion', 'static');
    expect(container.querySelector('.landing-mark')).toHaveAttribute('data-mark-motion', 'static');
    expect(listeners.size).toBe(0);
  });

  it('falls back to the complete static artwork without IntersectionObserver', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<LandingVisual />);
    expect(container.querySelector('.home-hero-scene')).toHaveAttribute('data-landing-motion', 'static');
    expect(container.querySelector('.landing-mark')).toHaveAttribute('data-mark-motion', 'static');
  });

  it('gives separate outline filters unique identifiers and unsubscribes on unmount', () => {
    const { container, unmount } = render(<><LandingMark /><LandingMark /></>);
    const ids = [...container.querySelectorAll('filter')].map((filter) => filter.id);
    expect(new Set(ids).size).toBe(2);
    unmount();
    expect(listeners.size).toBe(0);
  });
});
