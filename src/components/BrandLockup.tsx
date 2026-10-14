import { chapterDescriptor, parentMark } from '../content/brand';

interface BrandLockupProps {
  tone: 'pink' | 'white';
  className?: string;
}

/** The genuine GIVC artwork followed by a separate typeset "at Columbia" descriptor. */
export function BrandLockup({ tone, className }: BrandLockupProps) {
  return (
    <span className={['brand-lockup', `brand-lockup-${tone}`, className].filter(Boolean).join(' ')}>
      <img
        className="brand-mark"
        src={parentMark[tone]}
        alt={parentMark.alt}
        width={parentMark.width}
        height={parentMark.height}
      />{' '}
      <span className="brand-descriptor">{chapterDescriptor}</span>
    </span>
  );
}
