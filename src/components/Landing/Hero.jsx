import React from 'react';
import heroImage from '../../assets/hero1.jpeg'; // Replace with your actual image
import '../../styles/Landing/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-6 md:px-12">
        {/* Left side: Heading, text, button */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="hero-title">
              <span className="hero-title-line">SMARTER TRIPS.</span>
              <span className="hero-title-line">ZERO STRESS.</span>
            </h1>
            <p className="hero-description">
              Build epic journeys in minutes. Answer a few fun questions, invite your crew, and watch your perfect itinerary appear— maps, budgets, and memories included. Travel planning just got a glow-up.
            </p>
          </div>
          <button className="hero-button mt-4 self-start">
            Start planning <span className="button-arrow">→</span>
          </button>
        </div>

        {/* Right side: Image */}
        <div className="flex justify-end items-start">
          <img src={heroImage} alt="Adventure preview" className="rounded-xl shadow-xl max-w-[480px] w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Hero;