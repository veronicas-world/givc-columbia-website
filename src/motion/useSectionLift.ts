import { useEffect } from 'react';
import { canAnimate, onReducedMotionRequested } from './motion';

const liftSelector = 'main .home-band > .home-inner, main .home-intro';
const maxLift = 12; // pixels; whole-pixel offsets keep the text crisp

/**
 * Home-only scroll drift: a section's inner content rests a few pixels below its place
 * while it approaches the middle of the screen and lifts a few pixels above it as the
 * section is scrolled past, so bands drift gently through the page. Only inner content
 * moves, never the band backgrounds or the hero. Each offset is measured from the
 * element's untransformed position (the last offset applied here is subtracted), so the
 * drift tracks the scroll instead of feeding back into itself.
 */
export function useSectionLift(enabled: boolean) {
  useEffect(() => {
    if (!enabled || !canAnimate()) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(liftSelector));
    if (targets.length === 0) return;

    const applied = new Map<HTMLElement, number>();
    const update = () => {
      const halfViewport = window.innerHeight / 2;
      const offsets = targets.map((target) => {
        const rect = target.getBoundingClientRect();
        // getBoundingClientRect includes the offset this hook applied last time.
        const restCenter = rect.top + rect.height / 2 - (applied.get(target) ?? 0);
        const progress = Math.min(1, Math.max(-1, (restCenter - halfViewport) / halfViewport));
        return Math.round(progress * maxLift);
      });
      targets.forEach((target, index) => {
        const offset = offsets[index] ?? 0;
        applied.set(target, offset);
        target.style.transform = offset === 0 ? '' : `translate3d(0, ${offset}px, 0)`;
      });
    };

    const onScroll = () => update();
    const settle = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      for (const target of targets) {
        target.style.transform = '';
        applied.set(target, 0);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    const unsubscribe = onReducedMotionRequested(() => {
      settle();
      unsubscribe();
    });
    return () => {
      unsubscribe();
      settle();
    };
  }, [enabled]);
}
