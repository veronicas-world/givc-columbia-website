import { ExternalLink } from '../components/ExternalLink';
import { InterestLink } from '../components/InterestLink';
import { PageHeader } from '../components/PageHeader';
import { Photo } from '../components/Photo';
import { activities, chapterIntro, parentSummary } from '../content/chapter';
import { siteLinks } from '../content/links';
import { homePhotos } from '../content/photos';

export function AboutPage() {
  return (
    <>
      <PageHeader title="About">
        <p>{chapterIntro}</p>
      </PageHeader>

      <Photo photo={homePhotos.campus} className="page-photo" />

      <section className="section" aria-labelledby="chapter-title">
        <h2 id="chapter-title">The Columbia chapter</h2>
        <p>
          Girls Into VC at Columbia is run by Columbia students. Its work centers on education, community, and access,
          through the chapter activities below.
        </p>
        <div className="activity-detail-list">
          {activities.map((activity) => (
            <article key={activity.title}>
              <h3>{activity.title}</h3>
              <p>{activity.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="network-title">
        <h2 id="network-title">The Girls Into VC network</h2>
        <div className="page-split">
          <div>
            <p>{parentSummary}</p>
            <p>
              Programs run by the wider network are separate from the chapter activities described above. For network
              information, visit <ExternalLink href={siteLinks.parentSite}>girlsintovc.com</ExternalLink> or read
              about its <ExternalLink href={siteLinks.parentCampusChapters}>campus chapters</ExternalLink>.
            </p>
          </div>
          <Photo photo={homePhotos.community} className="page-split-photo" />
        </div>
      </section>

      <section className="section section-callout" aria-labelledby="about-interest-title">
        <h2 id="about-interest-title">Get chapter updates</h2>
        <InterestLink />
      </section>
    </>
  );
}
