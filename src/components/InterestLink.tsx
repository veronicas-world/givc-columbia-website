import { siteLinks } from '../content/links';
import { ExternalLink } from './ExternalLink';

interface InterestLinkProps {
  variant?: 'primary' | 'plain';
}

export function InterestLink({ variant = 'primary' }: InterestLinkProps) {
  return (
    <ExternalLink href={siteLinks.interestForm} className={variant === 'primary' ? 'button button-primary' : undefined}>
      Join our interest list
    </ExternalLink>
  );
}
