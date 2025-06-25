import React, { useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';
import logo from '../../assets/hero.avif';
import '../../styles/Landing/Footer.css';

const Footer = ({ darkMode }) => {
  const [showLove, setShowLove] = useState(false);

  const handleHeartClick = () => {
    setShowLove(true);
    setTimeout(() => setShowLove(false), 3000); // hide after 3s
  };

  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : 'light-mode'}`} aria-label="Website footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src={logo}
              alt="Trip Wizard Logo"
              className="footer-logo"
              width="32"
              height="32"
              loading="lazy"
            />
            <span className="footer-title">TRIP WIZARD</span>
          </div>

          <div className="footer-columns">
            {[
              { title: 'Discover', links: ['Perks', 'Plans', 'Stories', 'Help', 'Team'] },
              { title: 'Organize', links: ['Build', 'Send', 'Split', 'Diary', 'Tips'] },
              { title: 'Social', links: ['Message', 'Votes', 'Crew', 'Invite', 'Sync'] },
              { title: 'Extras', links: ['Help', 'Terms', 'Policy', 'Email', 'Jobs'] }
            ].map((col, idx) => (
              <nav className="footer-column" aria-label={`${col.title} links`} key={idx}>
                <h4 className="footer-heading">{col.title}</h4>
                <ul className="footer-links">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="footer-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            {['Legal', 'Cookies', 'Sitemap'].map(link => (
              <a href="#" key={link} className="legal-link" aria-label={`${link} policy`}>
                {link}
              </a>
            ))}
          </div>

          <div className="footer-social" aria-label="Social media links">
            {[
              { icon: <FaFacebookF />, label: 'Facebook' },
              { icon: <FaInstagram />, label: 'Instagram' },
              { icon: <FaTwitter />, label: 'Twitter' },
              { icon: <FaLinkedinIn />, label: 'LinkedIn' },
              { icon: <FaYoutube />, label: 'YouTube' }
            ].map(({ icon, label }) => (
              <a href="#" key={label} className="social-link" aria-label={`Visit our ${label}`}>
                {icon}
              </a>
            ))}
          </div>

          <div className="footer-copy">
            <p>
              &copy; {new Date().getFullYear()} TripWizard. Made with{' '}
              <span
                className="heart"
                role="button"
                tabIndex="0"
                title="Psst... click me 😉"
                onClick={handleHeartClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleHeartClick();
                }}
              >
                ❤️
              </span>{' '}
              in Hyderabad, India.
            </p>
          </div>
        </div>

        {showLove && (
          <div className="confetti-popup" role="status" aria-live="polite">
            💚 Love from Hyderabad, just for you!
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
