import { Link } from 'react-router-dom';
import { siteLinks } from '../content/links';
import { BrandLockup } from './BrandLockup';
import { ExternalLink } from './ExternalLink';
import { SketchScatter } from './SketchScatter';

export function SiteFooter() {
  return (
    <footer className="site-footer sketch-section">
      <SketchScatter arrangement="footer" />
      <div className="site-footer-inner">
        <div className="footer-block footer-intro">
          <Link to="/about" className="footer-brand" aria-label="About the Columbia chapter">
            <BrandLockup tone="pink" />
          </Link>
        </div>
        <div className="footer-social-row">
          <ul className="footer-socials" aria-label="Social media">
            <li>
              <ExternalLink href={siteLinks.instagram} className="footer-social-link">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
                <span className="visually-hidden">Instagram</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={siteLinks.chapterLinkedIn} className="footer-social-link">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
                  <rect x="3" y="9" width="4" height="12" />
                  <circle cx="5" cy="5" r="2" />
                  <path d="M10 9h4v1.7C15 9.3 16 9 17.5 9C21 9 22 11.2 22 14.5V21h-4v-6c0-1.7-.4-2.8-2-2.8S14 13.5 14 15v6h-4Z" />
                </svg>
                <span className="visually-hidden">LinkedIn</span>
              </ExternalLink>
            </li>
          </ul>
          <span className="footer-credit">
            Built with <ExternalLink href="https://factory.ai">Factory</ExternalLink>
          </span>
        </div>
        <nav className="footer-block footer-nav" aria-label="Footer">
          <ul className="footer-list">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/people">People</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
