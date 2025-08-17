// TripTabs.jsx
import React from 'react';
import PropTypes from 'prop-types';

const TripTabs = ({ days, activeTab, onTabChange }) => {
  if (!days || days.length === 0) {
    return (
      <div className="tabs-container">
        <p className="tabs-error">No days to display. Add itinerary days first.</p>
      </div>
    );
  }

  return (
    <div className="tabs-container" role="tablist">
      <div className="tabs">
        {days.map((tab, idx) => (
          <div
            key={`tab-${idx}`}
            className={`tab ${idx === activeTab ? 'active' : ''}`}
            onClick={() => onTabChange(idx)}
            role="tab"
            aria-selected={idx === activeTab}
            aria-controls={`tabpanel-${idx}`}
            tabIndex={idx === activeTab ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTabChange(idx);
              }
            }}
          >
            {tab.icon && <i className={tab.icon} aria-hidden="true"></i>}
            <span className="tab-label">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

TripTabs.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default TripTabs;