import { representationFigures, representationLead, whyWeExist } from '../content/representation';

/** Compact parent-reference context. Figures carry `data-figure-value` so motion can settle on the real value. */
export function RepresentationFigures() {
  return (
    <section className="home-band home-figures" aria-labelledby="why-title" data-figures="true">
      <div className="home-inner home-centered">
        <h2 id="why-title">Why we exist</h2>
        <p>{whyWeExist}</p>
        <div className="figures-panel">
          <p className="figures-lead">{representationLead}</p>
          <ul className="figure-list">
            {representationFigures.map((figure) => (
              <li key={figure.value} className="figure">
                <span className="figure-value" data-figure-value={figure.value}>
                  {figure.value}%
                </span>{' '}
                <span className="figure-label">{figure.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
