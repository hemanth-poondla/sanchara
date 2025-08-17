// Moodboard.jsx
import React from 'react';

const Moodboard = ({ images }) => {
  return (
    <div className="photo-grid">
      {images.map(({ url, alt }, idx) => (
        <img key={idx} src={url} alt={alt || `photo-${idx}`} />
      ))}
    </div>
  );
};

export default Moodboard;