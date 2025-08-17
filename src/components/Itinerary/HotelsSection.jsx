// HotelsSection.jsx
import React from 'react';

const HotelsSection = ({ hotels }) => {
  return (
    <div className="section">
      <h2><i className="fas fa-hotel"></i> Recommended Accommodations</h2>
      <div className="hotel-scroll">
        {hotels.map((hotel, idx) => (
          <div key={idx} className="hotel-card">
            <div className="hotel-img">
              <img src={hotel.image} alt={hotel.name} />
              <div className="hotel-day">{hotel.day}</div>
            </div>
            
            <div className="hotel-content">
              <div className="hotel-header">
                <h4 className="hotel-name">{hotel.name}</h4>
                <div className="hotel-price">{hotel.price}</div>
              </div>
              
              <div className="hotel-rating">
                <div className="stars">
                  {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                  {hotel.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                </div>
                <span>{hotel.rating} ({hotel.reviews} reviews)</span>
              </div>
              
              <p className="hotel-description">{hotel.description}</p>
              
              <div className="hotel-features">
                {hotel.features.map((f, i) => (
                  <span key={i} className="hotel-feature">{f}</span>
                ))}
              </div>
              
              <div className="hotel-button-wrapper">
                <a href={hotel.bookingUrl} className="hotel-book-btn">
                  <i className="fas fa-bookmark"></i> Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsSection;