import { Link } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { ExternalLink } from '../components/ExternalLink';
import { InterestLink } from '../components/InterestLink';
import { activities, chapterIntro, chapterName, interestFormNote, pillars, reasonsToJoin } from '../content/chapter';
import { homeHighlightEvents } from '../content/events';
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

      <section className="section" aria-labelledby="home-events-title">
        <h2 id="home-events-title">Past chapter events</h2>
        <div className="event-list">
          {homeHighlightEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <p>
          <Link to="/events">See all past events</Link>
        </p>
      </section>

      <section className="section" aria-labelledby="explore-title">
        <h2 id="explore-title">Explore the chapter</h2>
        <ul className="explore-list">
          <li>
            <Link to="/people">Meet the board and members</Link>
            <p>The chapter board and the member directory.</p>
          </li>
          <li>
            <Link to="/resources">Browse resources</Link>
            <p>Curated reading and career links about venture capital.</p>
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
