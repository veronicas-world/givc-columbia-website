import type { PastEvent } from '../content/events';

interface EventCardProps {
  event: PastEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card" aria-labelledby={`event-${event.id}`}>
      <img className="event-photo" src={event.image.src} alt={event.image.alt} loading="lazy" />
      <div className="event-body">
        <p className="event-format">{event.format}</p>
        <h3 id={`event-${event.id}`}>{event.title}</h3>
        <p>{event.summary}</p>
        <dl className="event-meta">
          <div>
            <dt>Date</dt>
            <dd className={event.date ? undefined : 'pending'}>{event.date ?? 'Date to be confirmed'}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd className={event.location ? undefined : 'pending'}>{event.location ?? 'Location to be confirmed'}</dd>
          </div>
        </dl>
        <ul className="event-speakers" aria-label="Speakers">
          {event.speakers.map((speaker) => (
            <li key={speaker.name}>
              <span className="event-speaker-name">{speaker.name}</span>
              {speaker.affiliation ? <span className="event-speaker-detail">{speaker.affiliation}</span> : null}
              {speaker.pending ? <span className="event-speaker-detail pending">{speaker.pending}</span> : null}
            </li>
          ))}
        </ul>
        {event.partner ? <p className="event-partner">{event.partner}</p> : null}
      </div>
    </article>
  );
}
