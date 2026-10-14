import type { ReactNode } from 'react';
import './PageLayout.css';

interface PageSectionProps {
  children: ReactNode;
  labelledBy: string;
  tone?: 'white' | 'pale' | 'pink';
  className?: string;
}

/** Full-width color bands keep their content aligned with the shared page margins. */
export function PageSection({ children, labelledBy, tone = 'white', className }: PageSectionProps) {
  return (
    <section className={`page-band page-band-${tone}`} aria-labelledby={labelledBy}>
      <div className={['section page-band-inner', className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </section>
  );
}
