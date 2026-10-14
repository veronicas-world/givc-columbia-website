import { chapterDescriptor, parentMark } from '../content/brand';
import { LandingMark } from './LandingMark';

interface BrandLockupProps {
  tone: 'pink' | 'white';
  className?: string;
  /** Home only: outline and fill the authentic mark, without replacing the identity. */
  animateMark?: boolean;
}

/** The genuine GIVC artwork followed by a separate typeset "at Columbia" descriptor. */
export function BrandLockup({ tone, className, animateMark = false }: BrandLockupProps) {
  return (
    <span className={['brand-lockup', `brand-lockup-${tone}`, className].filter(Boolean).join(' ')}>
      {animateMark && tone === 'white' ? <LandingMark /> : (
        <img
          className="brand-mark"
          src={parentMark[tone]}
          alt={parentMark.alt}
          width={parentMark.width}
          height={parentMark.height}
        />
      )}{' '}
      <span className="brand-descriptor">{chapterDescriptor}</span>
    </span>
  );
}
