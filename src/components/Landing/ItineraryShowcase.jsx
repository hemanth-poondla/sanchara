import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Landing/ItineraryShowcase.css';

import trip1 from '../../assets/how1.png';
import trip2 from '../../assets/how2.png';
import trip3 from '../../assets/how3.png';
import trip4 from '../../assets/how4.png';
import trip5 from '../../assets/how5.png';

const trips = [
  { image: trip1, title: "Himalayan Escape", days: "7D / 6N", tags: ["Mountain", "Wellness"] },
  { image: trip2, title: "Goa Chill Week", days: "5D / 4N", tags: ["Beach", "Party"] },
  { image: trip3, title: "Tokyo Urban Dash", days: "4D / 3N", tags: ["City", "Solo"] },
  { image: trip4, title: "Desert Vibes - Jaisalmer", days: "3D / 2N", tags: ["Culture", "Desert"] },
  { image: trip5, title: "Romantic Paris", days: "6D / 5N", tags: ["Couple", "Europe"] },
  // Adding more trips to demonstrate scrolling
  { image: trip1, title: "Kerala Backwaters", days: "5D / 4N", tags: ["Nature", "Relax"] },
  { image: trip2, title: "Rajasthan Royalty", days: "6D / 5N", tags: ["Heritage", "Luxury"] }
];

const ItineraryShowcase = ({ darkMode }) => {
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    
    // Calculate visible cards based on container width
    const handleResize = () => {
      const containerWidth = document.querySelector('.itinerary-scroll-wrapper')?.offsetWidth;
      if (containerWidth) {
        const cardWidth = 300; // Fixed card width
        const gap = 24; // Gap between cards
        const cards = Math.floor(containerWidth / (cardWidth + gap));
        setVisibleCards(Math.max(1, Math.min(3, cards))); // Limit to 1-3 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleFavorite = (index) => {
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 300;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount * visibleCards,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`itinerary-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="itinerary-header">
        <h2>Curated Trips for Instant Inspiration</h2>
        <p>A glimpse of where TripWizard can take you.</p>
      </div>

      <div className="itinerary-container">
        <button 
          className={`scroll-button left ${loading ? 'hidden' : ''}`} 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <span className="scroll-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        
        <div className="itinerary-scroll-wrapper">
          <div className="itinerary-scroll" ref={scrollRef}>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div className="itinerary-card skeleton" key={`skeleton-${index}`}>
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-tags">
                      <div className="skeleton-tag"></div>
                      <div className="skeleton-tag"></div>
                    </div>
                    <div className="skeleton-button"></div>
                  </div>
                </div>
              ))
            ) : (
              trips.map((trip, index) => (
                <div className="itinerary-card" key={index}>
                  <div className="card-image-container">
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      loading="lazy"
                    />
                    <button 
                      className={`favorite-button ${favorites[index] ? 'active' : ''}`}
                      onClick={() => toggleFavorite(index)}
                      aria-label={favorites[index] ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      ♥
                    </button>
                  </div>
                  <div className="itinerary-info">
                    <div className="itinerary-title">{trip.title}</div>
                    <div className="itinerary-days">{trip.days}</div>
                    <div className="itinerary-tags">
                      {trip.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                    <button className="itinerary-btn">Preview</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button 
          className={`scroll-button right ${loading ? 'hidden' : ''}`} 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <span className="scroll-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default ItineraryShowcase;