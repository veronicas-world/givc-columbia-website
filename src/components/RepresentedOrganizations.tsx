import type { CSSProperties } from 'react';
import { representedOrganizations } from '../content/organizations';

export function RepresentedOrganizations() {
  return (
    <section className="home-band" aria-labelledby="represented-title">
      <div className="home-inner home-centered">
        <h2 id="represented-title">Where our members are represented</h2>
        <p className="home-aside">
          Organizations where chapter members have gained experience. The logos describe member experience; these
          organizations are not sponsors of the chapter.
        </p>
        <ul className="logo-grid">
          {representedOrganizations.map((organization) => (
            <li key={organization.id} style={{ '--logo-scale': organization.scale ?? 1 } as CSSProperties}>
              <img src={organization.logo} alt={organization.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
