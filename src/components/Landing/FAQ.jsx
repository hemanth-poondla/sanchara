import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Landing/FAQ.css';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqData = [
  {
    id: 'faq1',
    question: 'Is TripWizard actually magic or just really smart? ✨',
    answer: "It's both! Our AI is like a travel genie in your pocket — rub your phone (figuratively) and poof! Perfect itineraries appear. No lamp required!"
  },
  {
    id: 'faq2',
    question: "Will TripWizard work when I'm lost in the wilderness? 🌲",
    answer: "Absolutely! Once generated, your plans work offline — perfect for when you're chasing waterfalls or running from squirrels (we don't judge)."
  },
  {
    id: 'faq3',
    question: 'How do group decisions work? Do we still need rock-paper-scissors? ✊✋✌️',
    answer: "Our group polls eliminate the need for childhood games! The AI suggests options so good, the only debate will be 'why didn’t we think of that?'"
  },
  {
    id: 'faq4',
    question: 'Is the AI secretly a travel-obsessed robot? 🤖',
    answer: "Shh... our AI is actually thousands of tiny travel gnomes working around the clock. Just kidding! (Or are we?) It's cutting-edge tech that thinks it’s Anthony Bourdain."
  },
  {
    id: 'faq5',
    question: 'Can I brag about my trip to jealous friends? 😎',
    answer: "Oh honey, not just brag — you can rub it in with beautifully shared itineraries. Their FOMO will be our fault, and we're okay with that."
  }
];

const FAQ = ({ darkMode }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  const faqRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    if (faqRef.current) {
      faqRef.current.querySelectorAll('.faq-item').forEach((el, i) => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`faq-section ${darkMode ? 'dark' : 'light'}`}
      aria-label="Frequently Asked Questions"
    >
      <div className="faq-container" ref={faqRef}>
        <h2 className="faq-heading">Burning Questions (We've Got Answers!)</h2>

        <div className="faq-list" role="list">
          {faqData.map((item, i) => (
            <div
              key={item.id}
              className={`faq-item ${openIndex === i ? 'open' : ''} ${
                visibleIndexes.includes(i) ? 'visible' : ''
              }`}
              onClick={() => toggle(i)}
              tabIndex="0"
              role="listitem"
              aria-expanded={openIndex === i}
              aria-controls={`answer-${item.id}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {openIndex === i ? <FiMinus /> : <FiPlus />}
                </span>
              </div>
              <div
                id={`answer-${item.id}`}
                className="faq-answer"
                role="region"
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          Still curious?{' '}
          <a href="#" aria-label="Ask us anything – we promise we're fun!">
            Ask us anything – we promise we’re fun!
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
