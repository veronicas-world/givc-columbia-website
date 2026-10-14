import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function SiteShell() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  const isHome = pathname === '/';

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo?.(0, 0);
    // Moving focus to the new page lets keyboard and screen-reader users start at the new content.
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader overlay={isHome} />
      <main id="main" ref={mainRef} tabIndex={-1} className={isHome ? 'main-full' : undefined}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
