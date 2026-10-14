import { pastEvents, pastEventsAnchor } from '../content/events';
import { siteLinks } from '../content/links';
import { EventCard } from './EventCard';
import { ExternalLink } from './ExternalLink';

export function PastEventsArchive() {
  return (
    <section id={pastEventsAnchor} className="section archive-section" aria-labelledby="past-events-title" tabIndex={-1}>
      <h2 id="past-events-title">Past events</h2>
      <p>
        Speaker events and conversations the chapter has hosted. New events are announced on{' '}
        <ExternalLink href={siteLinks.instagram}>Instagram</ExternalLink>.
      </p>
      <p className="pending">
        Years are not listed, and some dates, rooms and speaker details are still being confirmed with the chapter.
      </p>
      <div className="event-list">
        {pastEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
