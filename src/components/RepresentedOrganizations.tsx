import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { representedOrganizations } from '../content/organizations';
import { useMotionAllowed } from '../motion/motion';

const pixelsPerSecond = 31;
const rowBreak = Math.ceil(representedOrganizations.length / 2);
const rows = [
  { direction: 1, logos: representedOrganizations.slice(0, rowBreak) },
  { direction: -1, logos: representedOrganizations.slice(rowBreak) },
];

export function RepresentedOrganizations() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const motionAllowed = useMotionAllowed();
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!motionAllowed || !carousel) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false));
    observer.observe(carousel);
    return () => observer.disconnect();
  }, [motionAllowed]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!motionAllowed || !inView || hovered || focused || touching || !carousel) return;

    const tracks = Array.from(carousel.querySelectorAll<HTMLDivElement>('.logo-carousel-viewport'), (viewport, index) => ({
      viewport,
      direction: rows[index]!.direction,
      position: viewport.scrollLeft,
      lastScroll: viewport.scrollLeft,
      resumeAt: 0,
    }));
    let previousTime: number | undefined;
    let frame: number;

    function advance(time: number) {
      const distance = previousTime === undefined ? 0 : Math.min(time - previousTime, 33) * pixelsPerSecond / 1000;
      previousTime = time;

      for (const track of tracks) {
        const { viewport } = track;
        const current = viewport.scrollLeft;
        if (current !== track.lastScroll) {
          // Let native swipe and trackpad momentum finish before taking over again.
          track.position = current;
          track.lastScroll = current;
          track.resumeAt = time + 300;
        }
        if (document.hidden || time < track.resumeAt || !distance) continue;

        // Each row holds two identical runs. Moving between matching points is visually seamless.
        const period = viewport.scrollWidth / 2;
        if (period <= viewport.clientWidth) continue;
        track.position = ((track.position + distance * track.direction) % period + period) % period;
        viewport.scrollLeft = track.position;
        track.lastScroll = viewport.scrollLeft;
      }

      frame = window.requestAnimationFrame(advance);
    }

    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [motionAllowed, inView, hovered, focused, touching]);

  return (
    <section className="home-band" aria-labelledby="represented-title">
      <div className="home-inner home-centered">
        <h2 id="represented-title" className="represented-title">Where Columbia's members are represented</h2>
        <div
          className="logo-carousel"
          ref={carouselRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onTouchStart={() => setTouching(true)}
          onTouchEnd={() => setTouching(false)}
          onTouchCancel={() => setTouching(false)}
        >
          {rows.map(({ direction, logos }, index) => (
            <div
              className="logo-carousel-viewport"
              key={direction}
              role="group"
              aria-label={`Organization logos, row ${index + 1}`}
              tabIndex={0}
            >
              <div className="logo-carousel-track">
                {(motionAllowed ? [false, true] : [false]).map((copy) => (
                  <ul className="logo-carousel-list" key={String(copy)} role="list" aria-hidden={copy || undefined}>
                    {logos.map((logo) => (
                      <li key={logo.id} style={{ '--logo-scale': logo.scale ?? 1 } as CSSProperties}>
                        <img src={logo.logo} alt={copy ? '' : logo.name} loading="lazy" />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
