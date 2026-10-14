import { useEffect } from 'react';
import { canAnimate } from './motion';

const revealSelector = 'main .home-band, main .home-media, main .section';
const pendingClass = 'reveal-pending';

/**
 * Fades page sections in the first time each scrolls into view. Only sections that
 * start below the fold are hidden, and only once an observer is watching them, so
 * nothing already on screen flickers and nothing stays hidden if observation is
 * unavailable. Each section reveals once per page visit.
 */
export function useSectionReveals(routeKey: string) {
  useEffect(() => {
    if (!canAnimate()) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(revealSelector)).filter(
      (section) => section.getBoundingClientRect().top > window.innerHeight,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove(pendingClass);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    for (const section of sections) {
      section.classList.add(pendingClass);
      observer.observe(section);
    }
    return () => {
      observer.disconnect();
      for (const section of sections) section.classList.remove(pendingClass);
    };
  }, [routeKey]);
}
