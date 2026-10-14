import type { SitePhoto } from '../content/photos';

interface PhotoProps {
  photo: SitePhoto;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/** A captionless photo; provenance stays in maintainer notes. */
export function Photo({ photo, className, loading = 'lazy' }: PhotoProps) {
  return (
    <div className={['photo-frame', className].filter(Boolean).join(' ')}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={loading}
        style={{ objectPosition: photo.focus }}
      />
    </div>
  );
}
