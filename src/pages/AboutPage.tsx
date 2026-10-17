import { ActivitySection } from '../components/ActivitySection';
import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';
import { Photo } from '../components/Photo';
import { ExternalLink } from '../components/ExternalLink';
import { activities, pastSpeakers, type Activity } from '../content/chapter';
import { siteLinks } from '../content/links';
import { activityPhotos, chapterActivityPhotos, networkPhotos, speakerPhotos } from '../content/photos';
import {
  networkDescriptionRest,
  networkGraphics,
  networkLeadership,
  networkName,
  networkPrograms,
} from '../content/network';

function activity(id: Activity['id']): Activity {
  return activities.find((candidate) => candidate.id === id)!;
}

export function AboutPage() {
  const speakerEvents = activity('speaker-events');
  return (
    <>
      <PageHeader title="About the Columbia chapter" />

      <PageSection labelledBy="activities-title">
        <h2 id="activities-title">Membership at Columbia</h2>
        <div className="activity-columns">
          <ActivitySection
            activity={activity('workshops')}
            title="Pre-Professional Workshops"
            photo={chapterActivityPhotos.workshops}
          />
          <ActivitySection activity={activity('fellowship')} photo={chapterActivityPhotos.fellowship} />
          <ActivitySection activity={activity('continued-education')} photo={activityPhotos[0]!} />
          <ActivitySection
            activity={activity('community')}
            photo={chapterActivityPhotos.community}
          />
        </div>
      </PageSection>

      <PageSection labelledBy="speaker-events-title" tone="pale" className="speaker-events">
        <h2 id="speaker-events-title">{speakerEvents.title}</h2>
        <p>{speakerEvents.detail}</p>
        <h3 className="speaker-list-title">Past speakers</h3>
        <ul className="speaker-figures">
          {pastSpeakers.map((speaker) => (
            <li key={speaker.id}>
              <figure>
                <Photo photo={speakerPhotos[speaker.id]} className="speaker-figure-photo" />
                <figcaption>
                  <span className="speaker-name">{speaker.name}</span>
                  <span className="speaker-role">{speaker.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection labelledBy="network-title">
        <div className="network-about-grid">
          <div>
            <h2 id="network-title">The Girls Into VC network</h2>
            <p>
              <ExternalLink href={siteLinks.parentSite}>{networkName}</ExternalLink>
              {networkDescriptionRest}
            </p>
            <p>{networkLeadership}</p>
          </div>
          <Photo photo={networkPhotos.about} className="network-about-photo" />
        </div>
        <ul className="open-grid">
          {networkPrograms.map((program) => (
            <li key={program.title}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection labelledBy="network-recognition-title" className="network-recognition">
        <h2 id="network-recognition-title">Partners and recognition</h2>
        <h3>Parent organization partners</h3>
        <img
          className="network-graphic"
          src={networkGraphics.partners.src}
          alt={networkGraphics.partners.alt}
          width={networkGraphics.partners.width}
          height={networkGraphics.partners.height}
          loading="lazy"
        />
        <h3>Featured in</h3>
        <p>Coverage and recognition highlighted by the wider Girls Into VC organization.</p>
        <img
          className="network-graphic network-graphic-press"
          src={networkGraphics.recognition.src}
          alt={networkGraphics.recognition.alt}
          width={networkGraphics.recognition.width}
          height={networkGraphics.recognition.height}
          loading="lazy"
        />
      </PageSection>
    </>
  );
}
