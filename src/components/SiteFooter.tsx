import { Link } from 'react-router-dom';
import { siteLinks } from '../content/links';
import { navItems } from '../content/navigation';
import { BrandLockup } from './BrandLockup';
import { ExternalLink } from './ExternalLink';
import { SketchScatter } from './SketchScatter';
import { SocialLink } from './SocialLink';

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
              <SocialLink platform="Instagram" href={siteLinks.instagram} className="footer-social-link" />
            </li>
            <li>
              <SocialLink platform="LinkedIn" href={siteLinks.chapterLinkedIn} className="footer-social-link" />
            </li>
          </ul>
          <span className="footer-credit">
            Built with <ExternalLink href="https://factory.ai">Factory</ExternalLink>
          </span>
        </div>
        <nav className="footer-block footer-nav" aria-label="Footer">
          <ul className="footer-list">
            {navItems.map((item) => (
              <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
