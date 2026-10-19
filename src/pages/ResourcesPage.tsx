import { ExternalLink } from '../components/ExternalLink';
import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';
import { siteLinks } from '../content/links';
import { parentNewsletter, parentPodcast, parentSocials } from '../content/parentResources';
import './ResourcesPage.css';

export function ResourcesPage() {
  return (
    <>
      <PageHeader title="Resources">
        <p>News, conversations, and social channels from the Girls Into VC parent organization.</p>
      </PageHeader>

      <PageSection labelledBy="newsletter-title" className="resources-newsletter">
        <p className="resource-source">Newsletter</p>
        <h2 id="newsletter-title">{parentNewsletter.title}</h2>
        <p>{parentNewsletter.description}</p>
        <ExternalLink href={parentNewsletter.url} className="button button-primary">
          Subscribe to the newsletter
        </ExternalLink>
      </PageSection>

      <PageSection labelledBy="podcast-title" tone="pale">
        <div className="resources-podcast">
          <img
            className="resources-podcast-cover"
            src={parentPodcast.cover.src}
            alt={parentPodcast.cover.alt}
            width={parentPodcast.cover.width}
            height={parentPodcast.cover.height}
            loading="lazy"
          />
          <div>
            <p className="resource-source">Podcast</p>
            <h2 id="podcast-title">{parentPodcast.title}</h2>
            <p>{parentPodcast.description}</p>
            <div className="actions">
              <ExternalLink href={parentPodcast.spotify} className="button button-primary">
                Listen on Spotify
              </ExternalLink>
              <ExternalLink href={parentPodcast.apple} className="button button-secondary">
                Listen on Apple Podcasts
              </ExternalLink>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection labelledBy="parent-socials-title">
        <h2 id="parent-socials-title">Follow Girls Into VC</h2>
        <p>
          Keep up with the parent organization on social media, or visit the{' '}
          <ExternalLink href={siteLinks.parentSite}>Girls Into VC website</ExternalLink>.
        </p>
        <ul className="open-grid resources-socials" aria-label="Parent organization social media">
          {parentSocials.map((social) => (
            <li key={social.name}>
              <h3>
                <ExternalLink href={social.url}>
                  {social.name} <span aria-hidden="true">↗</span>
                </ExternalLink>
              </h3>
              <p className="resources-social-account">{social.account}</p>
              <p>{social.description}</p>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
