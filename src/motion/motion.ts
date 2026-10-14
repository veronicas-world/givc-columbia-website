import { useEffect, useState, type RefObject } from 'react';

/**
 * Motion is an enhancement: it runs only when the browser can tell us an element
 * entered view and the visitor has not asked for reduced motion. In every other
 * case components render their complete final content straight away.
 */
export function canAnimate(): boolean {
  if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') return false;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  return !reduced;
}

/** Becomes true the first time the element is at least `threshold` visible, then stops observing. */
export function useInViewOnce(ref: RefObject<Element | null>, enabled: boolean, threshold = 0.35): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled, threshold]);

  return inView;
}
