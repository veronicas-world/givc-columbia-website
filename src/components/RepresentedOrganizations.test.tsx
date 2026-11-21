import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { representedOrganizations } from '../content/organizations';
import { RepresentedOrganizations } from './RepresentedOrganizations';

let notify: (isIntersecting: boolean) => void;
let frames: Map<number, FrameRequestCallback>;

beforeEach(() => {
  frames = new Map();
  let nextFrame = 0;
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) {
      notify = (isIntersecting) => callback([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    }
    observe() {}
    disconnect() {}
  });
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function renderCarousel() {
  const view = render(<RepresentedOrganizations />);
  const tracks = screen.getAllByRole('group', { name: /Organization logos, row/ });
  tracks.forEach((track) => {
    Object.defineProperties(track, {
      clientWidth: { value: 320 },
      scrollWidth: { value: 960 },
    });
  });
  return { ...view, tracks };
}

function step(time: number) {
  act(() => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(time));
  });
}

describe('logo carousel rotation', () => {
  it('glides in opposite directions in both rows and stops scheduling frames offscreen', () => {
    const { tracks: [top, bottom] } = renderCarousel();
    expect(screen.queryByRole('button')).toBeNull();
    expect(frames.size).toBe(0);

    act(() => notify(true));
    step(0);
    step(16);
    expect(top!.scrollLeft).toBeCloseTo(0.496);
    expect(bottom!.scrollLeft).toBeCloseTo(479.504);
    step(32);
    expect(top!.scrollLeft).toBeCloseTo(0.992);
    expect(bottom!.scrollLeft).toBeCloseTo(479.008);

    act(() => notify(false));
    expect(frames.size).toBe(0);
  });

  it('repeats matching runs at the seam without exposing duplicate logos to assistive technology', () => {
    const { tracks: [top, bottom] } = renderCarousel();
    for (const track of [top!, bottom!]) {
      const [original, copy] = track.querySelectorAll('ul');
      expect(copy).toHaveAttribute('aria-hidden', 'true');
      const sources = (list: HTMLUListElement) => [...list.querySelectorAll('img')].map((logo) => logo.src);
      expect(sources(copy!)).toEqual(sources(original!));
    }
    expect(screen.getAllByRole('img')).toHaveLength(representedOrganizations.length);
    top!.scrollLeft = 479.8;
    bottom!.scrollLeft = 0.2;

    act(() => notify(true));
    step(0);
    step(16);
    expect(top!.scrollLeft).toBeCloseTo(0.296);
    expect(bottom!.scrollLeft).toBeCloseTo(479.704);
  });

  it('waits while someone is using the carousel and after native scroll movement', () => {
    const { tracks: [top] } = renderCarousel();
    act(() => notify(true));
    fireEvent.mouseEnter(top!);
    expect(frames.size).toBe(0);
    fireEvent.mouseLeave(top!);
    fireEvent.focus(top!);
    expect(frames.size).toBe(0);
    fireEvent.blur(top!);
    fireEvent.touchStart(top!);
    expect(frames.size).toBe(0);
    fireEvent.touchCancel(top!);
    step(0);
    top!.scrollLeft = 45;
    step(16);
    step(32);
    expect(top!.scrollLeft).toBe(45);
    step(320);
    expect(top!.scrollLeft).toBeGreaterThan(45);
  });

  it('leaves the scrollable logos available without autoplay under reduced motion', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
    const { tracks } = renderCarousel();
    for (const track of tracks) {
      expect(track).toHaveAttribute('tabindex', '0');
      expect(track.querySelectorAll('ul')).toHaveLength(1);
    }
    expect(screen.getAllByRole('img')).toHaveLength(representedOrganizations.length);
    expect(frames.size).toBe(0);
  });
});
