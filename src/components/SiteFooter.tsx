import { Link } from 'react-router-dom';
import { chapterName } from '../content/chapter';
import { instagramHandle, siteLinks } from '../content/links';
import { navItems } from '../content/navigation';
import { ExternalLink } from './ExternalLink';
import { InterestLink } from './InterestLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-block footer-intro">
          <p className="footer-name">{chapterName}</p>
          <p>A student-led chapter of the Girls Into VC network.</p>
          <InterestLink />
        </div>
        <div className="footer-block">
          <h2 className="footer-heading">Connect</h2>
          <ul className="footer-list">
            <li>
              <ExternalLink href={siteLinks.instagram}>Instagram {instagramHandle}</ExternalLink>
            </li>
            <li>
              {siteLinks.chapterLinkedIn ? (
                <ExternalLink href={siteLinks.chapterLinkedIn}>Chapter LinkedIn</ExternalLink>
              ) : (
                <span className="pending">Chapter LinkedIn: coming soon</span>
              )}
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <nav className="footer-block" aria-label="Footer">
          <h2 className="footer-heading">Pages</h2>
          <ul className="footer-list">
            {navItems
              .filter((item) => item.path !== '/contact')
              .map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
