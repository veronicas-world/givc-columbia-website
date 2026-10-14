import { useEffect, useRef, useState } from 'react';
import { canAnimate, useInViewOnce } from './motion';

interface TypewriterHeadingProps {
  id: string;
  text: string;
  /** Milliseconds per character. */
  speed?: number;
}

/**
 * A heading that types itself once when it first enters view. The complete text
 * is always present for assistive technology; the typed copy is aria-hidden and
 * keeps the untyped remainder in place (invisible) so the layout never shifts.
 */
export function TypewriterHeading({ id, text, speed = 40 }: TypewriterHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [animate] = useState(canAnimate);
  const inView = useInViewOnce(ref, animate);
  const [typed, setTyped] = useState(animate ? 0 : text.length);

  useEffect(() => {
    if (!inView || typed >= text.length) return;
    const timer = window.setTimeout(() => setTyped(typed + 1), speed);
    return () => window.clearTimeout(timer);
  }, [inView, typed, speed, text.length]);

  const done = typed >= text.length;
  const state = done ? 'done' : inView ? 'typing' : 'waiting';

  return (
    <h2 id={id} ref={ref} className="typewriter" data-typewriter={state}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, typed)}
        {done ? null : <span className="typewriter-caret" />}
        <span className="typewriter-rest">{text.slice(typed)}</span>
      </span>
    </h2>
  );
}
