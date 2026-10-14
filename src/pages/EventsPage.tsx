import { EventCard } from '../components/EventCard';
import { ExternalLink } from '../components/ExternalLink';
import { PageHeader } from '../components/PageHeader';
import { pastEvents } from '../content/events';
import { siteLinks } from '../content/links';

export function EventsPage() {
  return (
    <>
      <PageHeader title="Events">
        <p>
          Speaker events and conversations the chapter has hosted. New events are announced on{' '}
          <ExternalLink href={siteLinks.instagram}>Instagram</ExternalLink>.
        </p>
      </PageHeader>

      <section className="section" aria-labelledby="past-events-title">
        <h2 id="past-events-title">Past events</h2>
        <p className="pending">
          Years are not listed, and some dates, rooms and speaker details are still being confirmed with the chapter.
        </p>
        <div className="event-list">
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}
