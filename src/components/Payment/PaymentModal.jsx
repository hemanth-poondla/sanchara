import React, { useEffect, useRef } from 'react';
import '../../styles/Payment/PaymentModal.css';

const plans = [
  {
    name: 'Basic',
    price: '₹0',
    description: 'PDF-only itinerary, no notes, no regeneration',
    button: 'Select',
    class: 'basic',
    value: 'basic',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹199',
    description: 'Editable itinerary, blog notes, expense tracker',
    button: 'Choose Pro',
    class: 'pro',
    value: 'pro',
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹299',
    description: 'All Pro features, AI-powered regen, shareable preview',
    button: 'Choose Premium',
    class: 'premium',
    value: 'premium',
    popular: false,
  },
];

const PlanCard = ({ plan, onSelect }) => (
  <div className={`plan-card ${plan.class} ${plan.popular ? 'popular' : ''}`}>
    {plan.popular && <div className="popular-badge">Most Popular</div>}
    <h3>{plan.name}</h3>
    <p className="price">{plan.price}</p>
    <p className="desc">{plan.description}</p>
    <button
      className={`select-button ${plan.class}`}
      onClick={() => onSelect(plan.value)}
      aria-label={`Select ${plan.name} plan`}
    >
      {plan.button}
    </button>
  </div>
);

const PaymentModal = ({ isOpen, onClose, onSelectPlan }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Cleanup
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="payment-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="payment-modal"
        ref={modalRef}
        tabIndex="-1"
      >
        <button 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close payment modal"
        >
          ×
        </button>
        <h2 className="modal-title">Choose a plan to generate your itinerary</h2>
        <div className="plan-options">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.value} 
              plan={plan} 
              onSelect={onSelectPlan} 
            />
          ))}
        </div>
        <p className="cancel-text">You can cancel anytime</p>
      </div>
    </div>
  );
};

export default PaymentModal;