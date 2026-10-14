import { ExternalLink } from '../components/ExternalLink';
import { PageHeader } from '../components/PageHeader';
import { siteLinks } from '../content/links';

export function ContactPage() {
  return (
    <PageHeader title="Contact">
      <p>
        A contact form is not available yet. To reach the chapter, message us on{' '}
        <ExternalLink href={siteLinks.instagram}>Instagram</ExternalLink>.
      </p>
    </PageHeader>
  );
}
