import { ContactForm } from '../components/ContactForm';
import { ExternalLink } from '../components/ExternalLink';
import { PageHeader } from '../components/PageHeader';
import { instagramHandle, siteLinks } from '../content/links';

export function ContactPage() {
  return (
    <>
      <PageHeader title="Contact">
        <p>
          Chapter email is not connected yet, so this form cannot send messages. Until it is, the quickest way to
          reach us is <ExternalLink href={siteLinks.instagram}>{`Instagram (${instagramHandle})`}</ExternalLink>.
        </p>
      </PageHeader>
      <section className="section" aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading">Send a message</h2>
        <ContactForm />
      </section>
    </>
  );
}
