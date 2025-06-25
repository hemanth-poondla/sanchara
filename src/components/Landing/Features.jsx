import React from 'react';
import '../../styles/Landing/Features.css'; 
import { FaMagic, FaRobot, FaMoneyBillWave, FaComments, FaPenFancy } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

const Features = ({ darkMode }) => {
  const features = [
    { icon: <FaMagic />, title: 'Visual trip builder', desc: 'Pick your vibe, see your trip unfold instantly.' },
    { icon: <FaRobot />, title: 'Custom AI itineraries', desc: 'Unique plans packed with local flavor.' },
    { icon: <FaMoneyBillWave />, title: 'Instant expense split', desc: 'Track costs, split bills, stay chill.' },
    { icon: <FaComments />, title: 'Group chat & polls', desc: 'Chat, vote, and let AI settle it.' },
    { icon: <FiMessageSquare />, title: 'Offline everything', desc: 'Access plans, maps, and notes—no WiFi needed.' },
    { icon: <FaPenFancy />, title: 'Daily travel journal', desc: 'Capture memories, share your story in style.' }
  ];

  return (
    <section 
      className="features-section" 
      data-theme={darkMode ? "dark" : "light"}
    >
      <h3 className="features-subheading">SMARTER TRIPS, ZERO STRESS</h3>
      <h2 className="features-heading">Features for effortless adventures</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      <button className="start-planning-btn">Start Planning</button>
    </section>
  );
};

export default Features;