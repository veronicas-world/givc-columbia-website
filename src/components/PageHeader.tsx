import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {children ? <div className="page-lede">{children}</div> : null}
    </header>
  );
}
