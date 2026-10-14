import { useRef } from 'react';
import { representationFigures, representationLead, whyWeExist } from '../content/representation';
import { useInViewOnce, useMotionAllowed } from '../motion/motion';
import { RollingNumber } from '../motion/RollingNumber';

/** Compact parent-reference context. The figures roll once, together, when the panel first enters view. */
export function RepresentationFigures() {
  const panelRef = useRef<HTMLDivElement>(null);
  const animate = useMotionAllowed();
  const inView = useInViewOnce(panelRef, animate);

  return (
    <section className="home-band home-figures" aria-labelledby="why-title" data-figures="true">
      <div className="home-inner home-centered">
        <h2 id="why-title">Why we exist</h2>
        <p>{whyWeExist}</p>
        <div className="figures-panel" ref={panelRef}>
          <p className="figures-lead">{representationLead}</p>
          <ul className="figure-list">
            {representationFigures.map((figure, index) => (
              <li key={figure.value} className="figure">
                <RollingNumber value={figure.value} suffix="%" animate={animate} active={inView} delay={index * 120} />{' '}
                <span className="figure-label">{figure.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
