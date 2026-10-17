import type { ReactNode } from 'react';
import { SketchScatter } from './SketchScatter';
import './PageLayout.css';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  singleLineTitle?: boolean;
}

export function PageHeader({ title, children, singleLineTitle = false }: PageHeaderProps) {
  return (
    <header
      className={['page-header', 'sketch-section', singleLineTitle ? 'page-header-single-line-title' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <SketchScatter arrangement="title" />
      <div className="page-header-inner">
        <h1>{title}</h1>
        {children ? <div className="page-lede">{children}</div> : null}
      </div>
    </header>
  );
}
