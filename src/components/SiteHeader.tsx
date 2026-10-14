import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../content/navigation';
import { useMotionAllowed } from '../motion/motion';
import { BrandLockup } from './BrandLockup';

interface SiteHeaderProps {
  /** Sits on top of the pink Home opening instead of above the page. */
  overlay?: boolean;
}

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const motionAllowed = useMotionAllowed();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={overlay ? 'site-header site-header-overlay' : 'site-header'}
      data-menu-open={menuOpen}
      data-home-intro={overlay && motionAllowed ? 'running' : 'static'}
    >
      <div className="site-header-inner">
        <Link
          to="/"
          className="site-wordmark"
          aria-label="Girls Into VC at Columbia home"
          onClick={() => setMenuOpen(false)}
        >
          <BrandLockup tone="pink" />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
        <nav id="site-nav" aria-label="Main" className="site-nav" data-open={menuOpen}>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.path === '/'} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
