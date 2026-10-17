import { ExternalLink } from '../components/ExternalLink';
import { ContactForm } from '../components/ContactForm';
import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';
import { instagramHandle, siteLinks } from '../content/links';

export function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" />
      <PageSection labelledBy="interest-heading" tone="pink" className="contact-interest">
        <h2 id="interest-heading">Join our interest list</h2>
        <a href={siteLinks.interestForm} className="button button-primary" target="_blank" rel="noopener noreferrer">
          Click here
        </a>
      </PageSection>
      <PageSection labelledBy="contact-channels-heading">
        <h2 id="contact-channels-heading">Get in touch</h2>
        <ContactForm />
        <ul className="contact-channels">
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
