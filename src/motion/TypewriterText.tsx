import { useEffect, useRef, useState } from 'react';
import { useInViewOnce, useMotionAllowed } from './motion';

interface TypewriterTextProps {
  id?: string;
  text: string;
  as?: 'p' | 'h2';
  className?: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Share an entry trigger with surrounding content, or observe this text itself. */
  active?: boolean;
}

/** The full text stays accessible and reserves space while the visual copy types once. */
export function TypewriterText({ id, text, as: Tag = 'p', className, speed = 20, active }: TypewriterTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const animate = useMotionAllowed();
  const observed = useInViewOnce(ref, animate && active === undefined);
  const entered = active ?? observed;
  const [step, setStep] = useState(0);
  const typed = animate ? step : text.length;

  useEffect(() => {
    if (!animate || !entered || typed >= text.length) return;
    const timer = window.setTimeout(() => setStep(typed + 1), speed);
    return () => window.clearTimeout(timer);
  }, [animate, entered, typed, speed, text.length]);

  const done = typed >= text.length;
  const state = done ? 'done' : entered ? 'typing' : 'waiting';

  return (
    <Tag id={id} ref={ref} className={['typewriter', className].filter(Boolean).join(' ')} data-typewriter={state}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, typed)}
        {done ? null : <span className="typewriter-caret" />}
        <span className="typewriter-rest">{text.slice(typed)}</span>
      </span>
    </Tag>
  );
}
