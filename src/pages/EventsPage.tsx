import { ExternalLink } from '../components/ExternalLink';
import { PageHeader } from '../components/PageHeader';
import { siteLinks } from '../content/links';

export function EventsPage() {
  return (
    <PageHeader title="Events">
      <p>
        An archive of past chapter events will be listed here. Upcoming events are announced on{' '}
        <ExternalLink href={siteLinks.instagram}>Instagram</ExternalLink>.
      </p>
    </PageHeader>
  );
}
