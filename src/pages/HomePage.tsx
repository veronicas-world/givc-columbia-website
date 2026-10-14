import { Link } from 'react-router-dom';
import { ExternalLink } from '../components/ExternalLink';
import { InterestLink } from '../components/InterestLink';
import { activities, chapterIntro, chapterName, interestFormNote, pillars, reasonsToJoin } from '../content/chapter';
import { siteLinks } from '../content/links';

export function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <h1 id="home-title">{chapterName}</h1>
        <p className="home-intro">{chapterIntro}</p>
        <div className="actions">
          <InterestLink />
          <ExternalLink href={siteLinks.instagram} className="button button-secondary">
            Follow on Instagram
          </ExternalLink>
        </div>
      </section>

      <section className="section" aria-labelledby="pillars-title">
        <h2 id="pillars-title">Education, community, and access</h2>
        <ul className="pillar-list">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="activities-title">
        <h2 id="activities-title">What we do</h2>
        <ul className="activity-list">
          {activities.map((activity) => (
            <li key={activity.title}>
              <h3>{activity.title}</h3>
              <p>{activity.summary}</p>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/about">More about the chapter</Link>
        </p>
      </section>

      <section className="section" aria-labelledby="reasons-title">
        <h2 id="reasons-title">Why join</h2>
        <ul className="reason-list">
          {reasonsToJoin.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="explore-title">
        <h2 id="explore-title">Explore</h2>
        <ul className="explore-list">
          <li>
            <Link to="/events">Past events</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
        </ul>
      </section>

      <section className="section section-callout" aria-labelledby="interest-title">
        <h2 id="interest-title">Stay in touch</h2>
        <p>{interestFormNote}</p>
        <InterestLink />
      </section>
    </>
  );
}
