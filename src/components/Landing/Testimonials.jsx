import React from 'react';
import '../../styles/Landing/Testimonials.css';
import avatar1 from '../../assets/how1.png';
import avatar2 from '../../assets/how2.png';
import avatar3 from '../../assets/how3.png';

const testimonials = [
  {
    quote: "Booked a wild group getaway in minutes! The AI totally got our vibe—zero stress, all fun.",
    name: "Alex Rivera",
    role: "Globetrotter",
    avatar: avatar1
  },
  {
    quote: "Planning was actually fun for once. Group polls kept us in sync, and the chat made it a breeze.",
    name: "Skyler Brooks",
    role: "Adventure Chaser",
    avatar: avatar2
  },
  {
    quote: "Every detail nailed—from secret spots to easy expense splits. Our trip felt effortless and unique.",
    name: "Riley Chen",
    role: "Family Explorer",
    avatar: avatar3
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonial-header">
        <h2>Real travelers. Real magic moments.</h2>
        <p>Hear how our AI turns trip dreams into epic adventures—straight from the explorers themselves.</p>
      </div>
      <div className="testimonial-cards">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <p className="testimonial-quote">“{t.quote}”</p>
            <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-role">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
