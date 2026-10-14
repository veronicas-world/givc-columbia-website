import type { ReactNode } from 'react';
import { SketchScatter } from './SketchScatter';
import './PageLayout.css';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="page-header sketch-section">
      <SketchScatter arrangement="title" />
      <div className="page-header-inner">
        <h1>{title}</h1>
        {children ? <div className="page-lede">{children}</div> : null}
      </div>
    </header>
  );
}
