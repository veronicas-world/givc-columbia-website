import { useEffect, useState } from 'react';

interface RollingNumberProps {
  /** Final single-digit value. */
  value: number;
  suffix?: string;
  /** False keeps the number at its final value with no motion. */
  animate: boolean;
  /** Starts the single, finite roll. */
  active: boolean;
  /** Milliseconds to wait after `active` before rolling, for a slight stagger. */
  delay?: number;
}

/** One full turn of the dial, then on to the final value. */
function rollSequence(value: number): number[] {
  return [...Array.from({ length: 10 }, (_, digit) => digit), ...Array.from({ length: value + 1 }, (_, digit) => digit)];
}

/** Each step is a little slower than the last so the dial eases to a stop. */
function stepDuration(step: number): number {
  return 35 + step * 5;
}

/**
 * An odometer-style digit that rolls once and settles on `value`. The final value
 * is always in the accessible text; the rolling digit is aria-hidden, so screen
 * readers never hear the intermediate digits.
 */
export function RollingNumber({ value, suffix = '', animate, active, delay = 0 }: RollingNumberProps) {
  const sequence = rollSequence(value);
  const last = sequence.length - 1;
  const [rollStep, setStep] = useState(0);
  const [rollStarted, setStarted] = useState(false);
  // Once `animate` turns off (for example reduced motion requested mid-roll), the
  // final value shows at once and both effects below cancel their pending timers.
  const step = animate ? rollStep : last;
  const started = animate && rollStarted;

  useEffect(() => {
    if (!animate || !active || started) return;
    const timer = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(timer);
  }, [animate, active, started, delay]);

  useEffect(() => {
    if (!started || step >= last) return;
    const timer = window.setTimeout(() => setStep(step + 1), stepDuration(step));
    return () => window.clearTimeout(timer);
  }, [started, step, last]);

  const state = step >= last ? 'settled' : started ? 'rolling' : 'waiting';

  return (
    <span className="figure-value" data-figure-value={value} data-rolling={state}>
      <span className="visually-hidden">
        {value}
        {suffix}
      </span>
      <span className="figure-digits" aria-hidden="true">
        <span key={step} className={started && step > 0 ? 'figure-digit figure-digit-turn' : 'figure-digit'}>
          {sequence[step]}
        </span>
        {suffix}
      </span>
    </span>
  );
}
