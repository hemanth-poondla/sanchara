// HighlightBox.jsx
import React from 'react';

const HighlightBox = ({ highlight }) => {
  return (
    <div className="highlight-box">
      <h2><i className="fas fa-sun"></i> {highlight.title}</h2>
      <p><i className="fas fa-plane"></i> {highlight.summary}</p>
      <div className="quote">{highlight.quote}</div>
    </div>
  );
};

export default HighlightBox;