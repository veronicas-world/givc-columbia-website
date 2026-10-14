import type { ReactNode } from 'react';
import type { Activity } from '../content/chapter';
import type { SitePhoto } from '../content/photos';
import { PageSection } from './PageSection';
import { Photo } from './Photo';

interface ActivitySectionProps {
  activity: Activity;
  photo: SitePhoto;
  photoSide: 'left' | 'right';
  tone?: 'white' | 'pale';
  children?: ReactNode;
}

/** One chapter activity as its own band, with a chapter photo beside the copy. */
export function ActivitySection({ activity, photo, photoSide, tone = 'white', children }: ActivitySectionProps) {
  const headingId = `${activity.id}-title`;
  return (
    <PageSection labelledBy={headingId} tone={tone} className="activity-section">
      <div className="activity-section-grid" data-photo-side={photoSide}>
        <Photo photo={photo} className="activity-section-photo" />
        <div className="activity-section-copy">
          <h2 id={headingId}>{activity.title}</h2>
          <p>{activity.detail}</p>
          {children}
        </div>
      </div>
    </PageSection>
  );
}
