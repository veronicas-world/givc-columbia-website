import { Link } from 'react-router-dom';
import { ExternalLink } from '../components/ExternalLink';
import { InterestLink } from '../components/InterestLink';
import { BrandLockup } from '../components/BrandLockup';
import { Photo } from '../components/Photo';
import { RepresentedOrganizations } from '../components/RepresentedOrganizations';
import { activities, chapterIntro, interestFormNote, parentSummary, pillars, reasonsToJoin } from '../content/chapter';
import { pastEventsAnchor } from '../content/events';
import { siteLinks } from '../content/links';
import { activityPhotos, homePhotos } from '../content/photos';

export function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-inner">
          <h1 id="home-title" className="home-title">
            <BrandLockup tone="white" />
          </h1>
          <div className="home-hero-footer">
            <p>A student-led chapter at Columbia University.</p>
            <a href="#chapter">About the chapter</a>
          </div>
        </div>
      </section>

      <div className="home-campus">
        <Photo photo={homePhotos.librarySteps} className="home-campus-photo" />
      </div>

      <section id="chapter" className="home-band home-band-pale" aria-labelledby="chapter-title">
        <div className="home-inner">
          <div className="home-heading-row">
            <h2 id="chapter-title">The Columbia chapter</h2>
            <div className="home-aside">
              <p>{chapterIntro}</p>
              <p>{parentSummary}</p>
              <p>
                <Link to="/about">More about the chapter</Link>
              </p>
            </div>
          </div>
          <Photo photo={homePhotos.community} className="home-wide-photo" />
        </div>
      </section>

      <section className="home-band" aria-labelledby="pillars-title">
        <div className="home-inner">
          <h2 id="pillars-title">Education, community, and access</h2>
          <ul className="pillar-list">
            {pillars.map((pillar) => (
              <li key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-band home-band-pale" aria-labelledby="activities-title">
        <div className="home-inner">
          <h2 id="activities-title">What we do</h2>
          <ul className="activity-list">
            {activities.map((activity) => (
              <li key={activity.title}>
                <h3>{activity.title}</h3>
                <p>{activity.summary}</p>
              </li>
            ))}
          </ul>
          <div className="photo-row">
            {activityPhotos.map((photo) => (
              <Photo key={photo.src} photo={photo} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-band" aria-labelledby="reasons-title">
        <div className="home-inner home-split">
          <h2 id="reasons-title">Why join</h2>
          <ul className="reason-list">
            {reasonsToJoin.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </section>

      <RepresentedOrganizations />

      <section className="home-band home-band-pale" aria-labelledby="explore-title">
        <div className="home-inner">
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
            <li>
              <Link to={{ pathname: '/resources', hash: `#${pastEventsAnchor}` }}>See past events</Link>
              <p>Speaker events and conversations, listed under Resources.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="home-band home-band-pink" aria-labelledby="interest-title">
        <div className="home-inner home-split">
          <h2 id="interest-title">Stay in touch</h2>
          <div>
            <p>{interestFormNote}</p>
            <div className="actions">
              <InterestLink />
              <ExternalLink href={siteLinks.instagram} className="button button-secondary">
                Follow on Instagram
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
