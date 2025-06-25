import React, { useState, useEffect } from 'react';
import '../../styles/Landing/NavBar.css';
import { 
  FiChevronDown, 
  FiMap, 
  FiDollarSign, 
  FiMessageSquare, 
  FiBook, 
  FiLock, 
  FiWifiOff, 
  FiShare2, 
  FiUpload, 
  FiBarChart2, 
  FiMenu,
  FiX
} from 'react-icons/fi';

const Navbar = ({ darkMode }) => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close dropdown when mobile menu toggles
    if (!mobileMenuOpen) {
      setShowFeatures(false);
    }
  };

  const handleFeaturesClick = () => {
    if (isMobile) {
      setShowFeatures(!showFeatures);
    }
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setShowFeatures(false);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        <div className="logo">
          <div className="logo-icon">✈️</div>
          <span className="logo-text">TripWizard</span>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Main Navigation */}
        <div className={`nav-items ${mobileMenuOpen ? 'active' : ''}`}>
          {/* Features Dropdown */}
          <div 
            className="nav-link-container"
            onMouseEnter={() => !isMobile && setShowFeatures(true)}
            onMouseLeave={() => !isMobile && setShowFeatures(false)}
          >
            <span 
              className="nav-link"
              onClick={handleFeaturesClick}
              aria-haspopup="true"
              aria-expanded={showFeatures}
            >
              Features <FiChevronDown className={`dropdown-icon ${showFeatures ? 'rotate' : ''}`} />
            </span>
            
            {showFeatures && (
              <div className="dropdown-menu-wrapper">
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    {/* Plan Smarter Column */}
                    <div className="dropdown-column">
                      <h3>PLAN SMARTER</h3>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiMap className="item-icon" />
                        <div>
                          <div className="item-title">Magic itineraries</div>
                          <div className="item-desc">AI builds your dream trip instantly</div>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiDollarSign className="item-icon" />
                        <div>
                          <div className="item-title">Express Split</div>
                          <div className="item-desc">Split costs, no math required</div>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiMessageSquare className="item-icon" />
                        <div>
                          <div className="item-title">Group Chat</div>
                          <div className="item-desc">Chat, vote, and plan together</div>
                        </div>
                      </div>
                    </div>

                    {/* Organize Column */}
                    <div className="dropdown-column">
                      <h3>ORGANIZE</h3>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiBook className="item-icon" />
                        <div>
                          <div className="item-title">Daily Journal</div>
                          <div className="item-desc">Capture memories, every moment</div>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiLock className="item-icon" />
                        <div>
                          <div className="item-title">Lockbox</div>
                          <div className="item-desc">Store notes and key info securely</div>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiWifiOff className="item-icon" />
                        <div>
                          <div className="item-title">Offline Mode</div>
                          <div className="item-desc">Your plans, even off the grid</div>
                        </div>
                      </div>
                    </div>

                    {/* Monetize Column */}
                    <div className="dropdown-column">
                      <h3>MONETIZE</h3>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiShare2 className="item-icon" />
                        <div>
                          <div className="item-title">Creator Hub</div>
                          <div className="item-desc">Share and sell your best trips</div>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiUpload className="item-icon" />
                        <div>
                          <div className="item-title">Upload Files</div>
                          <div className="item-desc">Support AI with your guides</div>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={closeAllMenus}>
                        <FiBarChart2 className="item-icon" />
                        <div>
                          <div className="item-title">Analytics</div>
                          <div className="item-desc">Track trends and trip rates</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dropdown Footer */}
                  <div className="dropdown-footer">
                    <p>Plan. Split. Go. Repeat.</p>
                    <button className="dropdown-cta" onClick={closeAllMenus}>
                      Try here →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Regular Nav Links */}
          <a href="#" className="nav-link" onClick={closeAllMenus}>How it works</a>
          <a href="#" className="nav-link" onClick={closeAllMenus}>Stories</a>
          <a href="#" className="nav-link" onClick={closeAllMenus}>Help</a>

          {/* CTA Button */}
          <button className="cta-button" onClick={closeAllMenus}>
            Start trip
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;