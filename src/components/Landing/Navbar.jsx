import React, { useState, useEffect, useRef } from 'react';
import {
  FiChevronDown, FiMap, FiDollarSign, FiMessageSquare,
  FiBook, FiLock, FiWifiOff, FiShare2, FiUpload, FiBarChart2,
  FiMenu, FiX, FiSettings, FiLogOut, FiUser, FiHelpCircle, FiSun, FiMoon
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../styles/Landing/NavBar.css';

const DropdownItem = ({ Icon, title, description }) => (
  <div className="dropdown-item">
    <Icon className="item-icon" />{Icon}
    <div className="item-content">
      <div className="item-title">{title}</div>
      <div className="item-desc">{description}</div>
    </div>
  </div>
);

const Navbar = ({ darkMode, toggleTheme }) => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const featuresRef = useRef(null);
  const settingsRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setShowFeatures(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showFeatures && isMobile && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [showFeatures, isMobile]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowFeatures(false);
    setShowSettings(false);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setShowFeatures(false);
    setShowSettings(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowSettings(false);
    navigate('/');
  };

  return (
    <>
      {showFeatures && isMobile && (
        <div className="dropdown-overlay" onClick={closeAllMenus} />
      )}

      <nav className={`navbar ${darkMode ? 'dark' : 'light'}`} aria-label="Main navigation">
        <div className="navbar-container">
          <div className="logo">
            <div className="logo-icon">✈️</div>
            <span className="logo-text">TripWizard</span>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div className={`nav-items ${mobileMenuOpen ? 'active' : ''}`}>
            <div
              className="nav-link-container"
              ref={featuresRef}
              onMouseEnter={() => !isMobile && setShowFeatures(true)}
              onMouseLeave={() => !isMobile && setShowFeatures(false)}
            >
              <button
                className="nav-link"
                onClick={() => isMobile && setShowFeatures(!showFeatures)}
                aria-haspopup="true"
                aria-expanded={showFeatures}
              >
                Features <FiChevronDown className={`dropdown-icon ${showFeatures ? 'rotate' : ''}`} />
              </button>

              {showFeatures && (
                <div className="dropdown-menu-wrapper" ref={dropdownRef}>
                  <div className="dropdown-menu" role="menu">
                    <div className="dropdown-header">
                      <h2>TripWizard Features</h2>
                      <p>Chat, vote, and plan together</p>
                    </div>

                    <div className="dropdown-scroll-container">
                      <div className="dropdown-grid">
                        <div className="dropdown-column">
                          <h3>PLAN SMARTER</h3>
                          <DropdownItem Icon={FiMap} title="Magic itineraries" description="AI builds your dream trip instantly" />
                          <DropdownItem Icon={FiDollarSign} title="Express Split" description="Split costs, no math required" />
                          <DropdownItem Icon={FiMessageSquare} title="Group Chat" description="Chat, vote, and plan together" />
                        </div>
                        <div className="dropdown-column">
                          <h3>ORGANIZE</h3>
                          <DropdownItem Icon={FiBook} title="Daily Journal" description="Capture memories, every moment" />
                          <DropdownItem Icon={FiLock} title="Lockbox" description="Store notes and key info securely" />
                          <DropdownItem Icon={FiWifiOff} title="Offline Mode" description="Your plans, even off the grid" />
                        </div>
                        <div className="dropdown-column">
                          <h3>MONETIZE</h3>
                          <DropdownItem Icon={FiShare2} title="Creator Hub" description="Share and sell your best trips" />
                          <DropdownItem Icon={FiUpload} title="Upload Files" description="Support AI with your guides" />
                          <DropdownItem Icon={FiBarChart2} title="Analytics" description="Track trends and trip rates" />
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-footer">
                      <p>Plan. Split. Go. Repeat.</p>
                      <button className="dropdown-cta" onClick={closeAllMenus}>Try here →</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="nav-link" onClick={closeAllMenus}>How it works</a>
            <a href="#" className="nav-link" onClick={closeAllMenus}>Stories</a>
            <a href="#" className="nav-link" onClick={closeAllMenus}>Help</a>

            <div className="settings-container" ref={settingsRef}>
              <button
                className="settings-icon-button"
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Settings"
                aria-haspopup="true"
                aria-expanded={showSettings}
                onMouseDown={(e) => e.preventDefault()}
              >
                <FiSettings className="settings-icon" />
              </button>
              {showSettings && (
                <div className="settings-dropdown" role="menu">
                  <button className="settings-item"><FiUser /> <span>Profile</span></button>
                  <button className="settings-item"><FiHelpCircle /> <span>Support</span></button>
                  <button className="settings-item" onClick={toggleTheme}>
                    {darkMode ? <><FiSun /> <span>Light Mode</span></> : <><FiMoon /> <span>Dark Mode</span></>}
                  </button>
                  <button className="settings-item" onClick={handleLogout}>
                    <FiLogOut /> <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>

            <button className="cta-button" onClick={closeAllMenus}>Start trip</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
