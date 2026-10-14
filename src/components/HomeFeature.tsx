import type { ReactNode } from 'react';
import type { SitePhoto } from '../content/photos';
import { Photo } from './Photo';

interface HomeFeatureProps {
  id: string;
  title: string;
  photo: SitePhoto;
  photoSide: 'left' | 'right';
  pale?: boolean;
  photoFooter?: ReactNode;
  children: ReactNode;
}

/** Alternating editorial sections, with centered copy inside one half of the layout. */
export function HomeFeature({ id, title, photo, photoSide, pale = false, photoFooter, children }: HomeFeatureProps) {
  return (
    <section
      className={['home-band', 'home-feature', pale ? 'home-band-pale' : ''].filter(Boolean).join(' ')}
      aria-labelledby={id}
      data-photo-side={photoSide}
    >
      <div className="home-inner home-feature-inner">
        {photoFooter ? (
          <div className="home-feature-photo">
            <Photo photo={photo} />
            {photoFooter}
          </div>
        ) : (
          <Photo photo={photo} className="home-feature-photo" />
        )}
        <div className="home-feature-copy">
          <h2 id={id}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
