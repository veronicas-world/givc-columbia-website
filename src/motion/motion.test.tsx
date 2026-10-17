import { act, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RepresentationFigures } from '../components/RepresentationFigures';
import { SiteShell } from '../components/SiteShell';
import { TypewriterHeading } from './TypewriterHeading';
import { ChapterIntro } from '../components/ChapterIntro';
import { chapterIntro } from '../content/chapter';
import { HomeFeature } from '../components/HomeFeature';
import { homeFeaturePhotos } from '../content/photos';

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  readonly targets = new Set<Element>();
  disconnected = false;

  constructor(private readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.disconnected = true;
    this.targets.clear();
  }

  static enter(target: Element) {
    for (const observer of FakeIntersectionObserver.instances) {
      if (observer.disconnected || !observer.targets.has(target)) continue;
      const entry = { target, isIntersecting: true } as IntersectionObserverEntry;
      observer.callback([entry], observer as unknown as IntersectionObserver);
    }
  }

  static observing(target: Element) {
    return FakeIntersectionObserver.instances.some((observer) => !observer.disconnected && observer.targets.has(target));
  }
}

function setReducedMotion(reduced: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('reduce'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

/** A reduced-motion query whose preference can change after mount, like a live OS setting. */
function liveReducedMotion(initial = false) {
  let reduced = initial;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return reduced && query.includes('reduce');
    },
    media: query,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
  })) as unknown as typeof window.matchMedia;
  return {
    listeners,
    set(next: boolean) {
      reduced = next;
      act(() => {
        for (const listener of [...listeners]) listener({ matches: next } as MediaQueryListEvent);
      });
    },
  };
}

/** Text a sighted visitor sees: the aria-hidden visual copy, without the untyped remainder. */
function visibleTypedText(heading: HTMLElement) {
  const visual = heading.querySelector('[aria-hidden="true"]')!;
  const clone = visual.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('.typewriter-rest').forEach((node) => node.remove());
  return clone.textContent;
}

function visibleDigits(section: HTMLElement) {
  return Array.from(section.querySelectorAll('.figure-digits')).map((node) => node.textContent);
}

/** Advances fake time in small steps so each chained timer's re-render can schedule the next one. */
function tick(ms: number, step = 10) {
  for (let elapsed = 0; elapsed < ms; elapsed += step) {
    act(() => vi.advanceTimersByTime(step));
  }
}

const headingText = 'A Columbia chapter for women in venture capital';

describe('limited motion with an observer and normal motion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    FakeIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('types the heading once on entering view while its full text stays accessible', () => {
    render(<TypewriterHeading id="intro-title" text={headingText} speed={40} />);
    const heading = screen.getByRole('heading', { level: 2, name: headingText });
    expect(heading).toHaveAttribute('data-typewriter', 'waiting');
    expect(visibleTypedText(heading)).toBe('');

    act(() => FakeIntersectionObserver.enter(heading));
    tick(40 * 10);
    expect(heading).toHaveAttribute('data-typewriter', 'typing');
    expect(visibleTypedText(heading)).toBe(headingText.slice(0, 10));
    expect(screen.getByRole('heading', { level: 2, name: headingText })).toBe(heading);

    tick(40 * headingText.length);
    expect(heading).toHaveAttribute('data-typewriter', 'done');
    expect(visibleTypedText(heading)).toBe(headingText);
    expect(heading.querySelector('.typewriter-caret')).toBeNull();

    // Scrolling away and back does not replay: the observer has stopped watching.
    expect(FakeIntersectionObserver.observing(heading)).toBe(false);
    act(() => FakeIntersectionObserver.enter(heading));
    tick(200);
    expect(visibleTypedText(heading)).toBe(headingText);
  });

  it('shows the description immediately and reveals its photo once on scroll entry', () => {
    render(<MemoryRouter><ChapterIntro /></MemoryRouter>);
    const intro = screen.getByRole('region', { name: 'About us' });
    const paragraph = within(intro).getByRole('paragraph');
    expect(intro).toHaveAttribute('data-intro-state', 'waiting');
    expect(paragraph).toHaveClass('home-description');
    expect(paragraph).toHaveTextContent(chapterIntro);
    expect(paragraph).not.toHaveAttribute('data-typewriter');
    expect(within(intro).getByRole('img')).toBeInTheDocument();

    act(() => FakeIntersectionObserver.enter(intro));
    expect(intro).toHaveAttribute('data-intro-state', 'entered');
    expect(paragraph).toHaveTextContent(chapterIntro);
    expect(FakeIntersectionObserver.observing(intro)).toBe(false);
    act(() => FakeIntersectionObserver.enter(intro));
    expect(paragraph).toHaveTextContent(chapterIntro);
  });

  it('rolls each figure through other digits once and settles on 2, 7, 8 and 9', () => {
    render(<RepresentationFigures />);
    const section = screen.getByRole('region', { name: 'Why we exist' });
    const values = Array.from(section.querySelectorAll<HTMLElement>('[data-figure-value]'));
    expect(values.map((value) => within(value).getByText(/%$/, { selector: '.visually-hidden' }).textContent)).toEqual([
      '2%',
      '7%',
      '8%',
      '9%',
    ]);
    for (const value of values) {
      expect(value.querySelector('.figure-digits')).toHaveAttribute('aria-hidden', 'true');
      expect(value).toHaveAttribute('data-rolling', 'waiting');
      expect(value.closest('[aria-live]')).toBeNull();
    }

    act(() => FakeIntersectionObserver.enter(section.querySelector('.figures-panel')!));
    tick(600);
    expect(values.every((value) => value.dataset.rolling === 'rolling')).toBe(true);
    const midway = visibleDigits(section);
    expect(midway).not.toEqual(['2%', '7%', '8%', '9%']);

    tick(4000);
    expect(values.every((value) => value.dataset.rolling === 'settled')).toBe(true);
    expect(visibleDigits(section)).toEqual(['2%', '7%', '8%', '9%']);

    tick(4000);
    expect(visibleDigits(section)).toEqual(['2%', '7%', '8%', '9%']);
    expect(FakeIntersectionObserver.instances.every((observer) => observer.disconnected || observer.targets.size === 0)).toBe(
      true,
    );
  });

  it('hides only below-the-fold sections and reveals each once it enters view', () => {
    const below = { top: window.innerHeight + 200 } as DOMRect;
    const spy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return this.dataset.position === 'above' ? ({ top: 10 } as DOMRect) : below;
    });
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<SiteShell />}>
            <Route
              index
              element={
                <>
                  <section className="section" data-position="above" aria-label="First" />
                  <section className="section" aria-label="Second" />
                  <HomeFeature id="feature-title" title="Later feature" photo={homeFeaturePhotos.whyJoin} photoSide="left">
                    <p>A photo and its accompanying description.</p>
                  </HomeFeature>
                </>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const first = screen.getByRole('region', { name: 'First' });
    const second = screen.getByRole('region', { name: 'Second' });
    const feature = screen.getByRole('region', { name: 'Later feature' });
    expect(first).not.toHaveClass('reveal-pending');
    expect(second).toHaveClass('reveal-pending');
    expect(feature).toHaveClass('reveal-pending');

    act(() => FakeIntersectionObserver.enter(second));
    expect(second).not.toHaveClass('reveal-pending');
    expect(FakeIntersectionObserver.observing(second)).toBe(false);
    act(() => FakeIntersectionObserver.enter(feature));
    expect(feature).not.toHaveClass('reveal-pending');
    expect(FakeIntersectionObserver.observing(feature)).toBe(false);
    act(() => FakeIntersectionObserver.enter(feature));
    expect(feature).not.toHaveClass('reveal-pending');
    spy.mockRestore();
  });
});

describe('reduced motion requested after the page has loaded', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    FakeIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  function renderHeadingAndFigures() {
    const view = render(
      <>
        <TypewriterHeading id="intro-title" text={headingText} />
        <RepresentationFigures />
      </>,
    );
    const heading = screen.getByRole('heading', { level: 2, name: headingText });
    const section = screen.getByRole('region', { name: 'Why we exist' });
    return { ...view, heading, section, panel: section.querySelector('.figures-panel')! };
  }

  it('keeps the description visible and reveals its photo when reduced motion is enabled mid-visit', () => {
    const preference = liveReducedMotion(false);
    render(<MemoryRouter><ChapterIntro /></MemoryRouter>);
    const intro = screen.getByRole('region', { name: 'About us' });
    const paragraph = within(intro).getByRole('paragraph');
    expect(paragraph).toHaveTextContent(chapterIntro);
    expect(paragraph).not.toHaveAttribute('data-typewriter');
    expect(intro).toHaveAttribute('data-intro-state', 'waiting');

    preference.set(true);
    expect(intro).toHaveAttribute('data-intro-state', 'entered');
    expect(paragraph).toHaveTextContent(chapterIntro);
    expect(vi.getTimerCount()).toBe(0);
    preference.set(false);
    tick(200);
    expect(paragraph).toHaveTextContent(chapterIntro);
  });

  it('settles content immediately before entry and never starts it later', () => {
    const preference = liveReducedMotion(false);
    const { heading, section, panel } = renderHeadingAndFigures();
    expect(heading).toHaveAttribute('data-typewriter', 'waiting');

    preference.set(true);
    expect(heading).toHaveAttribute('data-typewriter', 'done');
    expect(visibleTypedText(heading)).toBe(headingText);
    expect(visibleDigits(section)).toEqual(['2%', '7%', '8%', '9%']);
    expect(section.querySelectorAll('[data-rolling="settled"]')).toHaveLength(4);
    expect(FakeIntersectionObserver.observing(heading)).toBe(false);
    expect(FakeIntersectionObserver.observing(panel)).toBe(false);

    act(() => {
      FakeIntersectionObserver.enter(heading);
      FakeIntersectionObserver.enter(panel);
    });
    tick(600);
    expect(visibleTypedText(heading)).toBe(headingText);
    expect(visibleDigits(section)).toEqual(['2%', '7%', '8%', '9%']);
  });

  it('completes typing and rolling mid-way, including staggered figures, and cancels pending timers', () => {
    const preference = liveReducedMotion(false);
    const { heading, section, panel } = renderHeadingAndFigures();
    act(() => {
      FakeIntersectionObserver.enter(heading);
      FakeIntersectionObserver.enter(panel);
    });
    // The last figure is still waiting for its stagger at 200ms.
    tick(200);
    expect(heading).toHaveAttribute('data-typewriter', 'typing');
    expect(section.querySelector('[data-figure-value="9"]')).toHaveAttribute('data-rolling', 'waiting');

    preference.set(true);
    expect(heading).toHaveAttribute('data-typewriter', 'done');
    expect(heading.querySelector('.typewriter-caret')).toBeNull();
    expect(visibleTypedText(heading)).toBe(headingText);
    expect(visibleDigits(section)).toEqual(['2%', '7%', '8%', '9%']);
    expect(section.querySelectorAll('[data-rolling="settled"]')).toHaveLength(4);
    expect(vi.getTimerCount()).toBe(0);

    // Turning the preference back off does not replay anything during this visit.
    preference.set(false);
    tick(600);
    expect(visibleTypedText(heading)).toBe(headingText);
    expect(visibleDigits(section)).toEqual(['2%', '7%', '8%', '9%']);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('reveals pending sections, stops observing them and does not re-hide them', () => {
    const preference = liveReducedMotion(false);
    const spy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(() => ({ top: window.innerHeight + 200 }) as DOMRect);
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<SiteShell />}>
            <Route index element={<section className="section" aria-label="Later" />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const later = screen.getByRole('region', { name: 'Later' });
    expect(later).toHaveClass('reveal-pending');

    preference.set(true);
    expect(later).not.toHaveClass('reveal-pending');
    expect(FakeIntersectionObserver.observing(later)).toBe(false);

    preference.set(false);
    expect(later).not.toHaveClass('reveal-pending');
    expect(FakeIntersectionObserver.observing(later)).toBe(false);
    spy.mockRestore();
  });

  it('removes its preference listeners on unmount', () => {
    const preference = liveReducedMotion(false);
    const { unmount } = renderHeadingAndFigures();
    expect(preference.listeners.size).toBeGreaterThan(0);
    unmount();
    expect(preference.listeners.size).toBe(0);
  });
});

describe('section lift while scrolling through Home', () => {
  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  /** Positions sections by name: at rest in the middle of the screen, far below, or already scrolled past. */
  function mockPositions() {
    return vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const height = 200;
      const top =
        this.dataset.position === 'below'
          ? window.innerHeight * 1.2
          : this.dataset.position === 'above'
            ? -window.innerHeight * 0.7
            : this.dataset.position === 'center'
              ? (window.innerHeight - height) / 2
              : 0;
      return { top, height } as DOMRect;
    });
  }

  function renderHome() {
    return render(
      <MemoryRouter>
        <Routes>
          <Route element={<SiteShell />}>
            <Route
              index
              element={
                <>
                  <section className="home-hero" aria-label="Hero">
                    <div className="home-hero-inner" data-position="center" />
                  </section>
                  <section className="home-intro" data-position="center" aria-label="Intro" />
                  <section className="home-band" aria-label="Band">
                    <div className="home-inner" data-position="below" />
                  </section>
                </>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  }

  it('lifts section content a few pixels as it is scrolled past, without touching the hero', () => {
    const spy = mockPositions();
    renderHome();
    const hero = document.querySelector<HTMLElement>('.home-hero-inner')!;
    const intro = screen.getByRole('region', { name: 'Intro' });
    const inner = document.querySelector<HTMLElement>('.home-band > .home-inner')!;
    expect(hero.style.transform).toBe('');
    expect(intro.style.transform).toBe('');
    expect(inner.style.transform).toBe('translate3d(0, 12px, 0)');

    inner.dataset.position = 'above';
    intro.dataset.position = 'below';
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(inner.style.transform).toBe('translate3d(0, -12px, 0)');
    expect(intro.style.transform).toBe('translate3d(0, 12px, 0)');
    expect(hero.style.transform).toBe('');
    spy.mockRestore();
  });

  it('keeps sections at rest on other pages', () => {
    const spy = mockPositions();
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route element={<SiteShell />}>
            <Route
              path="/about"
              element={
                <section className="home-band" aria-label="Band">
                  <div className="home-inner" data-position="below" />
                </section>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const inner = document.querySelector<HTMLElement>('.home-inner')!;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(inner.style.transform).toBe('');
    spy.mockRestore();
  });

  it('settles the drift at once when reduced motion is requested and never restarts it', () => {
    const preference = liveReducedMotion(false);
    const spy = mockPositions();
    renderHome();
    const inner = document.querySelector<HTMLElement>('.home-band > .home-inner')!;
    expect(inner.style.transform).toBe('translate3d(0, 12px, 0)');

    preference.set(true);
    expect(inner.style.transform).toBe('');

    inner.dataset.position = 'above';
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(inner.style.transform).toBe('');
    spy.mockRestore();
  });

  it('leaves content at rest when the browser cannot report visibility', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const spy = mockPositions();
    renderHome();
    const inner = document.querySelector<HTMLElement>('.home-band > .home-inner')!;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(inner.style.transform).toBe('');
    spy.mockRestore();
  });
});

describe('pink cover over the landing photo while scrolling', () => {
  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    frames.length = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => frames.push(callback));
    vi.stubGlobal('cancelAnimationFrame', () => {
      frames.length = 0;
    });
    setReducedMotion(false);
  });

  const frames: FrameRequestCallback[] = [];

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function renderHero(path = '/', renderedHeight = 1000) {
    let heroTop = 0;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const isHero = this.classList.contains('home-hero');
      return { top: isHero ? heroTop : 0, height: isHero ? renderedHeight : 0 } as DOMRect;
    });
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1000);
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<SiteShell />}>
            <Route path="*" element={<section className="home-hero" aria-label="Hero" />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const hero = screen.getByRole('region', { name: 'Hero' });
    const scrollTo = (top: number) => {
      heroTop = -top;
      act(() => {
        window.dispatchEvent(new Event('scroll'));
        for (const frame of frames.splice(0)) frame(0);
      });
    };
    return { hero, scrollTo };
  }

  it('fades the cover in as the landing scrolls away, and back out at the top', () => {
    const { hero, scrollTo } = renderHero();
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('0.000');
    scrollTo(300);
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('0.500');
    scrollTo(900);
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('1.000');
    scrollTo(0);
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('0.000');
  });

  it('uses the rendered landing height when the page is visually scaled', () => {
    const { hero, scrollTo } = renderHero('/', 900);
    scrollTo(270);
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('0.500');
  });

  it('removes the cover when reduced motion is requested and does not bring it back', () => {
    const preference = liveReducedMotion(false);
    const { hero, scrollTo } = renderHero();
    scrollTo(300);
    preference.set(true);
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('');
    scrollTo(600);
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('');
  });

  it('does nothing outside Home', () => {
    const { hero, scrollTo } = renderHero('/about');
    scrollTo(300);
    expect(hero.style.getPropertyValue('--hero-tint')).toBe('');
  });
});

describe('motion fallbacks', () => {
  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each(['reduced', 'unavailable'] as const)('shows the complete introduction and photo with %s motion', (mode) => {
    vi.stubGlobal('IntersectionObserver', mode === 'unavailable' ? undefined : FakeIntersectionObserver);
    setReducedMotion(mode === 'reduced');
    render(<MemoryRouter><ChapterIntro /></MemoryRouter>);
    const intro = screen.getByRole('region', { name: 'About us' });
    const paragraph = within(intro).getByRole('paragraph');
    expect(intro).toHaveAttribute('data-intro-state', 'entered');
    expect(paragraph).toHaveTextContent(chapterIntro);
    expect(paragraph).not.toHaveAttribute('data-typewriter');
    expect(within(intro).getByRole('img')).toBeInTheDocument();
    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });

  it('shows the complete heading and final figures at once when reduced motion is requested', () => {
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    setReducedMotion(true);
    render(
      <>
        <TypewriterHeading id="intro-title" text={headingText} />
        <RepresentationFigures />
      </>,
    );
    const heading = screen.getByRole('heading', { level: 2, name: headingText });
    expect(heading).toHaveAttribute('data-typewriter', 'done');
    expect(visibleTypedText(heading)).toBe(headingText);
    expect(visibleDigits(screen.getByRole('region', { name: 'Why we exist' }))).toEqual(['2%', '7%', '8%', '9%']);
    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });

  it('shows complete content when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    setReducedMotion(false);
    render(
      <>
        <TypewriterHeading id="intro-title" text={headingText} />
        <RepresentationFigures />
      </>,
    );
    const heading = screen.getByRole('heading', { level: 2, name: headingText });
    expect(visibleTypedText(heading)).toBe(headingText);
    const section = screen.getByRole('region', { name: 'Why we exist' });
    expect(visibleDigits(section)).toEqual(['2%', '7%', '8%', '9%']);
    expect(section.querySelectorAll('[data-rolling="settled"]')).toHaveLength(4);
  });
});
