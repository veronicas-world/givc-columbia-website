import { useEffect } from 'react';
import { canAnimate, onReducedMotionRequested } from './motion';

/** The pink cover is fully faded in once this share of the landing screen has scrolled away. */
const fullTintAt = 0.6;

/**
 * Home only: sets `--hero-tint` (0 to 1) on the landing section as it scrolls away,
 * so CSS can fade a translucent pink cover over the background photo.
 */
export function useHeroTint(enabled: boolean) {
  useEffect(() => {
    if (!enabled || !canAnimate()) return;
    const hero = document.querySelector<HTMLElement>('main .home-hero');
    if (!hero) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const height = rect.height || hero.offsetHeight || window.innerHeight;
      const scrolled = -rect.top;
      const tint = Math.min(1, Math.max(0, scrolled / (height * fullTintAt)));
      hero.style.setProperty('--hero-tint', tint.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const stop = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      hero.style.removeProperty('--hero-tint');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    const unsubscribe = onReducedMotionRequested(() => {
      stop();
      unsubscribe();
    });
    return () => {
      unsubscribe();
      stop();
    };
  }, [enabled]);
}
