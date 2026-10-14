import { Link } from 'react-router-dom';
import { ExternalLink } from '../components/ExternalLink';
import { InterestLink } from '../components/InterestLink';
import { BrandLockup } from '../components/BrandLockup';
import { Photo } from '../components/Photo';
import { RepresentationFigures } from '../components/RepresentationFigures';
import { RepresentedOrganizations } from '../components/RepresentedOrganizations';
import {
  activities,
  chapterIntro,
  chapterPurpose,
  interestFormNote,
  nycEngagement,
  reasonsToJoin,
} from '../content/chapter';
import { pastEventsAnchor } from '../content/events';
import { siteLinks } from '../content/links';
import { activityPhotos, homePhotos } from '../content/photos';
import { TypewriterHeading } from '../motion/TypewriterHeading';

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

      <div id="chapter" className="home-campus">
        <Photo photo={homePhotos.librarySteps} className="home-campus-photo" loading="eager" />
      </div>

      <section className="home-intro home-centered" aria-labelledby="intro-title" data-intro="true">
        <TypewriterHeading id="intro-title" text="A Columbia chapter for women in venture capital" />
        <p className="home-lede">{chapterIntro}</p>
        <p>{chapterPurpose}</p>
        <p>
          <Link to="/about">More about the chapter</Link>
        </p>
      </section>

      <section className="home-band home-band-pale" aria-labelledby="reasons-title">
        <div className="home-inner home-centered">
          <h2 id="reasons-title">Why join</h2>
          <ul className="reason-list">
            {reasonsToJoin.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-band" aria-labelledby="nyc-title">
        <div className="home-inner home-centered">
          <h2 id="nyc-title">In New York City</h2>
          <p>Being at Columbia puts the chapter close to the venture capital firms of New York.</p>
          <ul className="open-grid open-grid-2">
            {nycEngagement.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="home-media">
        <Photo photo={homePhotos.community} className="home-wide-photo" />
      </div>

      <section className="home-band" aria-labelledby="activities-title">
        <div className="home-inner home-centered">
          <h2 id="activities-title">What we do</h2>
          <ul className="open-grid open-grid-4">
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

      <RepresentationFigures />

      <RepresentedOrganizations />

      <section className="home-band home-band-pale" aria-labelledby="explore-title">
        <div className="home-inner home-centered">
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
        <div className="home-inner home-centered">
          <h2 id="interest-title">Stay in touch</h2>
          <p>{interestFormNote}</p>
          <div className="actions">
            <InterestLink />
            <ExternalLink href={siteLinks.instagram} className="button button-secondary">
              Follow on Instagram
            </ExternalLink>
          </div>
        </div>
      </section>
    </>
  );
}
