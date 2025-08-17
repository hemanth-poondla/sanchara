// PackingList.jsx
import React from 'react';

const PackingList = ({ title, iconClass, items }) => {
  return (
    <div className="section-card">
      <h3><i className={iconClass}></i> {title}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PackingList;