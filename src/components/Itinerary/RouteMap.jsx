// RouteMap.jsx
import React from 'react';

const RouteMap = ({ routes }) => {
  return (
    <div className="map-section">
      <div className="map-box">
        <div className="map-overlay">
          <h3><i className="fas fa-route"></i> Adventure Route Map</h3>
          <p>Interactive visualization of your journey</p>
        </div>
      </div>

      <div className="legend-box">
        <h3><i className="fas fa-map-pin"></i> Route Legend</h3>
        {routes.map((route, idx) => (
          <div key={idx} className="legend-item">
            <span className="legend-color" style={{ background: route.color }}></span>
            <div className="legend-content">
              <h4>{route.day}: {route.title}</h4>
              <p>{route.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;