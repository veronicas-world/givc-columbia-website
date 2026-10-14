import { ContactForm } from '../components/ContactForm';
import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';

export function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" />
      <PageSection labelledBy="contact-form-heading">
        <h2 id="contact-form-heading">Send a message</h2>
        <ContactForm />
      </PageSection>
    </>
  );
}
