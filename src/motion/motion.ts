import { useEffect, useState, type RefObject } from 'react';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function prefersReducedMotion(): boolean {
  return window.matchMedia?.(reducedMotionQuery).matches ?? false;
}

/**
 * Motion is an enhancement: it runs only when the browser can tell us an element
 * entered view and the visitor has not asked for reduced motion. In every other
 * case components render their complete final content straight away.
 */
export function canAnimate(): boolean {
  if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') return false;
  return !prefersReducedMotion();
}

/**
 * Calls `onReduce` the first time the visitor turns on reduced motion after the page
 * has loaded. Returns an unsubscribe function.
 */
export function onReducedMotionRequested(onReduce: () => void): () => void {
  const query = window.matchMedia?.(reducedMotionQuery);
  if (!query) return () => undefined;
  const listener = (event: MediaQueryListEvent) => {
    if (event.matches) onReduce();
  };
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }
  // Older Safari only supports the deprecated listener API.
  query.addListener?.(listener);
  return () => query.removeListener?.(listener);
}

/**
 * Whether this component may animate. Starts from `canAnimate()` and switches off
 * for good once reduced motion is requested, so turning the preference back off
 * never replays motion that was already settled during this visit.
 */
export function useMotionAllowed(): boolean {
  const [allowed, setAllowed] = useState(canAnimate);

  useEffect(() => {
    if (!allowed) return;
    return onReducedMotionRequested(() => setAllowed(false));
  }, [allowed]);

  return allowed;
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
