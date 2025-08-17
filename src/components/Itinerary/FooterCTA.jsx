// FooterCTA.jsx
import React from 'react';

const FooterCTA = ({ 
  heading = "Ready for Your Adventure?", 
  subtitle = "Your South African journey is perfectly planned and waiting for you", 
  downloadText = "Download Full Itinerary (PDF)", 
  customizeText = "Customize This Trip" 
}) => {
  return (
    <div className="footer-cta">
      <div className="footer-cta-content">
        <h2>{heading}</h2>
        <p>{subtitle}</p>
        <div className="cta-buttons">
          <button className="btn btn-cta">
            <i className="fas fa-file-download"></i> {downloadText}
          </button>
          <button className="btn btn-light">
            <i className="fas fa-sync-alt"></i> {customizeText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterCTA;