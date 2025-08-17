
// HeroStats.jsx
import React from 'react';

const HeroStats = ({ stats }) => {
  return (
    <div className="hero-stats">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-item">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;