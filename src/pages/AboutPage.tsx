import { ActivitySection } from '../components/ActivitySection';
import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';
import { Photo } from '../components/Photo';
import { NetworkStats } from '../components/NetworkStats';
import {
  activities,
  chapterIntro,
  fellowshipFormat,
  headlineSpeakers,
  womenInvestorsPanel,
  type Activity,
  type FeaturedSpeaker,
} from '../content/chapter';
import { chapterActivityPhotos, networkPhotos, speakerPhotos, type SitePhoto } from '../content/photos';
import { networkDescription, networkGraphics, networkLeadership, networkPrograms } from '../content/network';

function activity(id: Activity['id']): Activity {
  return activities.find((candidate) => candidate.id === id)!;
}

const speakerFigures: Array<{ speaker: FeaturedSpeaker; photo: SitePhoto }> = [
  { speaker: headlineSpeakers.avniBarman, photo: speakerPhotos.avniBarman },
  { speaker: headlineSpeakers.andreaWang, photo: speakerPhotos.andreaWang },
  { speaker: headlineSpeakers.joshuaBrowder, photo: speakerPhotos.joshuaBrowder },
];

export function AboutPage() {
  return (
    <>
      <PageHeader title="About the Columbia chapter">
        <p>{chapterIntro}</p>
      </PageHeader>

      <ActivitySection activity={activity('speaker-events')} photo={chapterActivityPhotos.speakerEvents} photoSide="left">
        <h3 className="speaker-list-title">Past speakers</h3>
        <ul className="speaker-figures">
          {speakerFigures.map(({ speaker, photo }) => (
            <li key={speaker.name}>
              <figure>
                <Photo photo={photo} className="speaker-figure-photo" />
                <figcaption>
                  <span className="speaker-name">{speaker.name}</span>
                  <span className="speaker-role">{speaker.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <h3 className="speaker-list-title">Women Investors in VC panel</h3>
        <ul className="speaker-names">
          {womenInvestorsPanel.map((speaker) => (
            <li key={speaker.name}>
              <span className="speaker-name">{speaker.name}</span>
              <span className="speaker-role">{speaker.role}</span>
            </li>
          ))}
        </ul>
      </ActivitySection>

      <ActivitySection activity={activity('workshops')} photo={chapterActivityPhotos.workshops} photoSide="right" tone="pale" />

      <ActivitySection activity={activity('fellowship')} photo={chapterActivityPhotos.fellowship} photoSide="left">
        <ul className="fellowship-format">
          {fellowshipFormat.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </ActivitySection>

      <ActivitySection activity={activity('community')} photo={chapterActivityPhotos.community} photoSide="right" tone="pale" />

      <PageSection labelledBy="network-title">
        <div className="network-about-grid">
          <div>
            <h2 id="network-title">The Girls Into VC network</h2>
            <p>{networkDescription}</p>
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

      <PageSection labelledBy="network-impact-title" tone="pink" className="network-impact">
        <h2 id="network-impact-title">The wider network’s impact</h2>
        <div className="network-impact-grid">
          <Photo photo={networkPhotos.impact} className="network-impact-photo" />
          <NetworkStats />
        </div>
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
