import { ExternalLink } from '../components/ExternalLink';
import { InterestLink } from '../components/InterestLink';
import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';
import { interestFormNote } from '../content/chapter';
import { presidentContact } from '../content/contact';
import { instagramHandle, siteLinks } from '../content/links';

export function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" />
      <PageSection labelledBy="interest-heading" tone="pink" className="contact-interest">
        <h2 id="interest-heading">Join our interest list</h2>
        <p>{interestFormNote}</p>
        <InterestLink />
      </PageSection>
      <PageSection labelledBy="contact-channels-heading">
        <h2 id="contact-channels-heading">Get in touch</h2>
        <ul className="contact-channels">
          <li>
            <h3>Email</h3>
            <p>
              {presidentContact.name}, {presidentContact.role}
            </p>
            <a href={`mailto:${presidentContact.email}`}>{presidentContact.email}</a>
          </li>
          <li>
            <h3>LinkedIn</h3>
            <p>Girls Into VC at Columbia</p>
            <ExternalLink href={siteLinks.chapterLinkedIn}>Follow us on LinkedIn</ExternalLink>
          </li>
          <li>
            <h3>Instagram</h3>
            <p>{instagramHandle}</p>
            <ExternalLink href={siteLinks.instagram}>Follow us on Instagram</ExternalLink>
          </li>
        </ul>
      </PageSection>
    </>
  );
}
