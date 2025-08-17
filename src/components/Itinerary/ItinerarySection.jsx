import React from 'react';
import '../../styles/Itinerary/ItineraryPlanner.css';

const ItinerarySection = ({ title, children, nested = false }) => {
  return (
    <div className={`section ${nested ? 'nested' : ''}`}>
      <h3 className="section-title">{title}</h3>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};

export default ItinerarySection;