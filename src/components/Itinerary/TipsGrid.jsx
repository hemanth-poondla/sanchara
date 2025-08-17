// TipsGrid.jsx
import React from 'react';

const TipsGrid = ({ tips }) => {
  return (
    <div className="tips-grid">
      {tips.map((tip, idx) => (
        <div key={idx} className="tip-item">
          <i className={tip.icon}></i>
          <div>
            <strong>{tip.title}</strong> {tip.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TipsGrid;