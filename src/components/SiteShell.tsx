import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { useSectionReveals } from '../motion/useSectionReveals';

export function SiteShell() {
  const { pathname, hash, key } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  const isHome = pathname === '/';

  // Child routes commit before this effect runs, so a hash target on the new page already exists.
  // Checking the hash first keeps a route change to an anchor from being undone by scroll-to-top.
  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView?.();
      target.focus({ preventScroll: true });
      return;
    }
    if (!pathChanged) return;
    window.scrollTo?.(0, 0);
    // Moving focus to the new page lets keyboard and screen-reader users start at the new content.
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash, key]);

  useSectionReveals(pathname);

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
