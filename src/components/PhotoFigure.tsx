import type { SitePhoto } from '../content/photos';

interface PhotoFigureProps {
  photo: SitePhoto;
  className?: string;
  showLabel?: boolean;
}

export function PhotoFigure({ photo, className, showLabel = true }: PhotoFigureProps) {
  return (
    <figure className={['photo-figure', className].filter(Boolean).join(' ')} data-context={photo.context}>
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
      <figcaption>
        {showLabel ? <span className="photo-label">{photo.label}</span> : null}
        <span className="photo-credit">{photo.credit}</span>
      </figcaption>
    </figure>
  );
}
