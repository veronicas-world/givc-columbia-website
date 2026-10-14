import type { CSSProperties } from 'react';
import { representedOrganizations } from '../content/organizations';

export function RepresentedOrganizations() {
  return (
    <section className="home-band" aria-labelledby="represented-title">
      <div className="home-inner home-centered">
        <h2 id="represented-title" className="represented-title">Where Columbia's members are represented</h2>
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
