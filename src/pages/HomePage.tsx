import { ChapterIntro } from '../components/ChapterIntro';
import { LandingVisual } from '../components/LandingVisual';
import { HomeFeature } from '../components/HomeFeature';
import { NetworkStats } from '../components/NetworkStats';
import { RepresentationFigures } from '../components/RepresentationFigures';
import { RepresentedOrganizations } from '../components/RepresentedOrganizations';
import {
  activities,
  nycEngagement,
  reasonsToJoin,
} from '../content/chapter';
import { homeFeaturePhotos } from '../content/photos';

export function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-inner">
          <LandingVisual />
        </div>
      </section>

      <ChapterIntro />

      <RepresentationFigures />

      <HomeFeature
        id="reasons-title"
        title="Why join"
        photo={homeFeaturePhotos.whyJoin}
        photoSide="left"
        pale
        photoFooter={<NetworkStats compact />}
      >
        <ul className="reason-list">
          {reasonsToJoin.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </HomeFeature>

      <HomeFeature id="nyc-title" title="In New York City" photo={homeFeaturePhotos.nyc} photoSide="right">
        <p>Being at Columbia puts the chapter close to the venture capital firms of New York.</p>
        <ul className="open-grid">
          {nycEngagement.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </HomeFeature>

      <HomeFeature id="activities-title" title="What we do" photo={homeFeaturePhotos.activities} photoSide="left" pale>
        <ul className="open-grid home-activity-list">
          {activities.map((activity) => (
            <li key={activity.title}>
              <h3>{activity.title}</h3>
              <p>{activity.summary}</p>
            </li>
          ))}
        </ul>
      </HomeFeature>

      <RepresentedOrganizations />
    </>
  );
}
