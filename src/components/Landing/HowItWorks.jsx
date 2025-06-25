import React from 'react';
import '../../styles/Landing/HowItWorks.css';
import img1 from '../../assets/how1.png';
import img2 from '../../assets/how2.png';
import img3 from '../../assets/how3.png';


const HowItWorks = ({ darkMode }) => {
  const steps = [
    {
      label: 'Itinerary wizard',
      title: 'Custom adventures, instantly',
      desc: 'Answer a few prompts, get a tailored day-by-day plan. No hassle, just pure travel vibes.',
      button: 'Build',
      image: img1
    },
    {
      label: 'Group chat',
      title: 'Plan together, faster',
      desc: 'Chat, vote, and merge ideas live. Every friend’s input, one epic trip.',
      button: 'Join',
      image: img2
    },
    {
      label: 'Expense splitter',
      title: 'Split costs, keep peace',
      desc: 'Track, split, and settle up in seconds. More fun, less math.',
      button: 'Split',
      image: img3
    }
  ];

  return (
    <section className={`how-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="how-header">
        <h2 className="how-title">Smarter trips, zero stress</h2>
        <p className="how-subtitle">
          AI-powered features for effortless planning, group fun, and stress-free adventures. <br />
          Your next trip just got a major upgrade.
        </p>
      </div>

      <div className="how-grid">
        {steps.map((step, i) => (
          <div className="how-card" key={i}>
            <img src={step.image} alt={step.title} className="how-image" />
            <div className="how-label">{step.label}</div>
            <div className="how-card-title">{step.title}</div>
            <div className="how-desc">{step.desc}</div>
            <button className="how-btn">{step.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
