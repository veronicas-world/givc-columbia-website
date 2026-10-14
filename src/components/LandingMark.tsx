import { useId } from 'react';
import { parentMark } from '../content/brand';
import { useMotionAllowed } from '../motion/motion';

/** The official artwork, outlined briefly before its normal white fill appears. */
export function LandingMark() {
  const filterId = `landing-outline-${useId().replace(/:/g, '')}`;
  const motionAllowed = useMotionAllowed();

  return (
    <span className="landing-mark" data-mark-motion={motionAllowed ? 'intro' : 'static'}>
      <img
        className="brand-mark"
        src={parentMark.white}
        alt={parentMark.alt}
        width={parentMark.width}
        height={parentMark.height}
      />
      <svg
        className="landing-mark-outline"
        viewBox={`0 0 ${parentMark.width} ${parentMark.height}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id={filterId} x="-2%" y="-5%" width="104%" height="110%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="0.7" result="outer" />
            <feMorphology in="SourceAlpha" operator="erode" radius="0.5" result="inner" />
            <feComposite in="outer" in2="inner" operator="out" result="edge" />
            <feFlood floodColor="var(--white)" />
            <feComposite in2="edge" operator="in" />
          </filter>
        </defs>
        <image
          href={parentMark.white}
          width={parentMark.width}
          height={parentMark.height}
          filter={`url(#${filterId})`}
        />
      </svg>
    </span>
  );
}
