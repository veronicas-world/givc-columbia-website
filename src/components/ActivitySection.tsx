import type { ReactNode } from 'react';
import type { Activity } from '../content/chapter';
import type { SitePhoto } from '../content/photos';
import { Photo } from './Photo';

interface ActivitySectionProps {
  activity: Activity;
  photo: SitePhoto;
  /** Replaces the activity's short title, which Home keeps. */
  title?: string;
  children?: ReactNode;
}

/** One chapter activity as a column, photo first, within a shared band. */
export function ActivitySection({ activity, photo, title, children }: ActivitySectionProps) {
  const headingId = `${activity.id}-title`;
  return (
    <section className="activity-column" aria-labelledby={headingId}>
      <Photo photo={photo} className="activity-column-photo" />
      <h2 id={headingId}>{title ?? activity.title}</h2>
      <p>{activity.detail}</p>
      {children}
    </section>
  );
}
