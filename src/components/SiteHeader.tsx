import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { chapterName } from '../content/chapter';
import { navItems } from '../content/navigation';

export function SiteHeader() {
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
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-wordmark">
          {chapterName}
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
