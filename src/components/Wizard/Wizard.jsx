import React, { useState, useEffect, useCallback, useMemo } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Wizard/Wizard.css";
import PaymentModal from "../Payment/PaymentModal";

const Wizard = () => {
  const [data, setData] = useState({
    origin: "",
    destination: "",
    travelers: "",
    vibe: [],
    budget: "",
    dateCertainty: "",
    exactDates: { start: null, end: null },
    flexibleDates: { month: "", days: "" },
    specialNeeds: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API;

  // Memoized steps configuration
  const steps = useMemo(() => [
    { 
      title: "Let's start your journey ✈️", 
      subtitle: "Where are you flying from?", 
      type: "origin", 
      key: "origin", 
      isRequired: true,
      icon: "✈️"
    },
    { 
      title: "Destination dreams 🌍", 
      subtitle: "Where do you want to go? (or say 'Surprise me!')", 
      type: "destination", 
      key: "destination", 
      isRequired: false,
      icon: "📍"
    },
    { 
      title: "Travel companions 👨‍👩‍👧‍👦", 
      subtitle: "Who's joining this adventure?", 
      type: "single", 
      key: "travelers", 
      options: [
        { label: "Solo", icon: "👤" }, 
        { label: "Couple", icon: "👫" }, 
        { label: "Friends", icon: "👬👭" }, 
        { label: "Family", icon: "👨‍👩‍👧‍👦" }
      ], 
      isRequired: true,
      icon: "👥"
    },
    { 
      title: "Vibe check 💃", 
      subtitle: "Pick 1–3 things you're most excited for", 
      type: "multi", 
      key: "vibe", 
      options: [ 
        { emoji: "🏖️", label: "Beach relax" }, 
        { emoji: "🏛️", label: "Culture" }, 
        { emoji: "🌲", label: "Nature" }, 
        { emoji: "🍜", label: "Foodie" }, 
        { emoji: "🎉", label: "Party" },
        { emoji: "🛍️", label: "Shopping" }
      ], 
      minSelections: 1, 
      maxSelections: 3,
      icon: "✨"
    },
    { 
      title: "Budget style 💸", 
      subtitle: "How fancy are we getting?", 
      type: "single", 
      key: "budget", 
      options: [ 
        { symbol: "₹", label: "Budget" }, 
        { symbol: "₹₹", label: "Comfort" }, 
        { symbol: "₹₹₹", label: "Luxury" } 
      ], 
      isRequired: true,
      icon: "💰"
    },
    { 
      title: "Date certainty 📅", 
      subtitle: "Do you have fixed travel dates?", 
      type: "single", 
      key: "dateCertainty", 
      options: [ 
        { emoji: "✅", label: "Yes, exact dates" }, 
        { emoji: "❓", label: "No, flexible" } 
      ], 
      isRequired: true,
      icon: "🗓️"
    },
    { 
      title: "Exact travel dates 🗓️", 
      subtitle: "Select your start and end dates", 
      type: "dateRange", 
      key: "exactDates", 
      condition: (data) => data.dateCertainty === "Yes, exact dates",
      icon: "📆"
    },
    { 
      title: "Flexible planning 🌈", 
      subtitle: "Pick your ideal month and duration", 
      type: "flexibleDates", 
      key: "flexibleDates", 
      condition: (data) => data.dateCertainty === "No, flexible", 
      children: [ 
        { title: "Preferred month", type: "monthPicker", key: "month" }, 
        { title: "Trip duration", type: "dayRange", key: "days", options: ["3-5 days", "1 week", "10 days", "2 weeks+"] } 
      ],
      icon: "🌈"
    },
    { 
      title: "Final touch ✨", 
      subtitle: "Any special requirements?", 
      type: "multi", 
      key: "specialNeeds", 
      options: [ 
        { label: "Wheelchair accessible", icon: "♿" }, 
        { label: "Pet friendly", icon: "🐾" }, 
        { label: "Vegetarian/vegan", icon: "🌱" }, 
        { label: "Allergy concerns", icon: "⚠️" } 
      ], 
      isRequired: false,
      icon: "✨"
    },
    { 
      title: "Almost there! 🎉", 
      subtitle: "Review your selections below", 
      type: "confirmation", 
      key: "confirm",
      icon: "✅"
    }
  ], []);

  // Load Google Maps API
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    );

    if (!existingScript && GOOGLE_MAP_API_KEY) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setMapsLoaded(true);
      script.onerror = () => setMapsLoaded(false);
      document.head.appendChild(script);
    } else if (window.google) {
      setMapsLoaded(true);
    }
  }, [GOOGLE_MAP_API_KEY]);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  }, []);

  const goToNextValidStep = useCallback((dir = 1) => {
    let next = currentStep + dir;
    while (steps[next] && steps[next].condition && !steps[next].condition(data)) {
      next += dir;
    }
    if (next >= 0 && next < steps.length) setCurrentStep(next);
  }, [currentStep, data, steps]);

  const handleNext = useCallback(() => {
    const step = steps[currentStep];
    
    if (step.isRequired && (!data[step.key] || (Array.isArray(data[step.key]) && data[step.key].length === 0))) {
      showToast("This field is required");
      return;
    }
    
    if (step.type === "multi" && step.minSelections && data[step.key].length < step.minSelections) {
      showToast(`Please select at least ${step.minSelections} options`);
      return;
    }
    
    if (step.type === "dateRange" && (!data.exactDates.start || !data.exactDates.end)) {
      showToast("Please select both start and end dates");
      return;
    }
    
    if (step.type === "flexibleDates" && (!data.flexibleDates.month || !data.flexibleDates.days)) {
      showToast("Please select both month and duration");
      return;
    }

    if (currentStep === steps.length - 1) {
      setShowPaymentModal(true);
      return;
    }
    
    goToNextValidStep(1);
  }, [currentStep, data, goToNextValidStep, showToast, steps]);

  const handleBack = useCallback(() => goToNextValidStep(-1), [goToNextValidStep]);
  const skipStep = useCallback(() => goToNextValidStep(1), [goToNextValidStep]);

  const handleChange = useCallback((key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleDateChange = useCallback((dates) => {
    const [start, end] = dates;
    setData(prev => ({ ...prev, exactDates: { start, end } }));
  }, []);

  const toggleSelection = useCallback((key, value) => {
    setData(prev => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  }, []);

  const renderLocationInput = useCallback((step) => {
    if (!mapsLoaded) {
      return (
        <div className="input-container">
          <input
            type="text"
            value={data[step.key]}
            onChange={(e) => handleChange(step.key, e.target.value)}
            className="location-input"
            placeholder={step.subtitle}
            autoComplete="off"
          />
          <span className="input-icon">📍</span>
        </div>
      );
    }

    return (
      <PlacesAutocomplete
        value={data[step.key]}
        onChange={(value) => handleChange(step.key, value)}
        onSelect={(value) => handleChange(step.key, value)}
        searchOptions={{ types: ['(cities)'] }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete-container">
            <div className="input-container">
              <input
                {...getInputProps({
                  className: "location-input",
                  placeholder: step.subtitle,
                  autoComplete: "off"
                })}
              />
              <span className="input-icon">📍</span>
            </div>
            <div className="autocomplete-dropdown">
              {loading && <div className="suggestion-item loading">Loading...</div>}
              {suggestions.map((suggestion, index) => (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: `suggestion-item ${suggestion.active ? "active" : ""}`,
                  })}
                  key={index}
                >
                  <span className="suggestion-icon">📍</span>
                  <span className="suggestion-text">{suggestion.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }, [data, handleChange, mapsLoaded]);

  const renderStep = useCallback(() => {
    const step = steps[currentStep];

    switch (step.type) {
      case "origin":
      case "destination":
        return renderLocationInput(step);

      case "single":
        return (
          <div className="options-grid">
            {step.options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn ${data[step.key] === opt.label ? "selected" : ""}`}
                onClick={() => handleChange(step.key, opt.label)}
                aria-label={opt.label}
              >
                <span className="option-icon">{opt.icon || opt.symbol || opt.emoji}</span>
                <span className="option-label">{opt.label}</span>
              </button>
            ))}
          </div>
        );

      case "multi":
        return (
          <div className="options-grid">
            {step.options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn ${data[step.key]?.includes(opt.label) ? "selected" : ""}`}
                onClick={() => toggleSelection(step.key, opt.label)}
                aria-label={opt.label}
                aria-pressed={data[step.key]?.includes(opt.label)}
              >
                <span className="option-icon">{opt.emoji || opt.icon}</span>
                <span className="option-label">{opt.label}</span>
                {data[step.key]?.includes(opt.label) && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            ))}
          </div>
        );

      case "dateRange":
        return (
          <div className="calendar-container">
            <DatePicker
              selected={data.exactDates.start}
              onChange={handleDateChange}
              startDate={data.exactDates.start}
              endDate={data.exactDates.end}
              selectsRange
              inline
              minDate={new Date()}
              calendarClassName="custom-datepicker"
              monthsShown={window.innerWidth > 768 ? 2 : 1}
              disabledKeyboardNavigation
            />
          </div>
        );

      case "flexibleDates":
        return (
          <div className="flexible-dates-container">
            <div className="month-picker">
              <h4 className="section-title">{step.children[0].title}</h4>
              <div className="select-container">
                <select
                  value={data.flexibleDates.month}
                  onChange={(e) =>
                    handleChange("flexibleDates", {
                      ...data.flexibleDates,
                      month: e.target.value,
                    })
                  }
                  aria-label="Select month"
                >
                  <option value="">Select month</option>
                  {Array.from({ length: 12 }, (_, i) =>
                    new Date(0, i).toLocaleString("default", { month: "long" })
                  ).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>
            <div className="day-range">
              <h4 className="section-title">{step.children[1].title}</h4>
              <div className="options-grid">
                {step.children[1].options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${data.flexibleDates.days === opt ? "selected" : ""}`}
                    onClick={() =>
                      handleChange("flexibleDates", {
                        ...data.flexibleDates,
                        days: opt,
                      })
                    }
                    aria-label={opt}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "confirmation":
        return (
          <div className="confirmation-grid">
            {[
              { label: "From", value: data.origin || "Not specified", icon: "✈️" },
              { label: "To", value: data.destination || "Surprise me!", icon: "📍" },
              { label: "Travelers", value: data.travelers || "Not specified", icon: "👥" },
              { label: "Vibe", value: data.vibe.length > 0 ? data.vibe.join(", ") : "Not specified", icon: "✨" },
              { label: "Budget", value: data.budget || "Not specified", icon: "💰" },
              {
                label: "Dates",
                value:
                  data.dateCertainty === "Yes, exact dates" && data.exactDates.start && data.exactDates.end
                    ? `${data.exactDates.start.toLocaleDateString()} to ${data.exactDates.end.toLocaleDateString()}`
                    : data.dateCertainty === "No, flexible" && data.flexibleDates.month
                    ? `${data.flexibleDates.month} for ${data.flexibleDates.days || "Not specified"}`
                    : "Not specified",
                icon: "🗓️"
              },
              { 
                label: "Special Needs", 
                value: data.specialNeeds.length > 0 ? data.specialNeeds.join(", ") : "None specified",
                icon: "✨"
              },
            ].map(({ label, value, icon }, i) => (
              <div key={i} className="confirmation-item">
                <div className="confirmation-icon">{icon}</div>
                <div className="confirmation-content">
                  <h4 className="confirmation-label">{label}</h4>
                  <p className="confirmation-value">{value}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }, [currentStep, data, handleChange, handleDateChange, renderLocationInput, steps, toggleSelection]);

  const handlePaymentComplete = useCallback((plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(false);
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Your itinerary is being generated!");
      // In a real app, you would redirect or show the itinerary here
    }, 2000);
  }, [showToast]);

  return (
    <div className="trip-wizard-container">
      <div className="trip-wizard">
        <div className="progress-tracker">
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="step-indicator">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <div className="wizard-card">
          <div className="card-header">
            <div className="step-icon">{steps[currentStep].icon}</div>
            <h1 className="card-title">{steps[currentStep].title}</h1>
            <p className="card-subtitle">{steps[currentStep].subtitle}</p>
          </div>

          <div className="card-content">
            {renderStep()}
          </div>

          <div className="card-actions">
            {currentStep > 0 && (
              <button 
                className="action-btn back-btn" 
                onClick={handleBack}
                aria-label="Go back to previous step"
              >
                Back
              </button>
            )}
            {!steps[currentStep].isRequired && currentStep !== steps.length - 1 && (
              <button 
                className="action-btn skip-btn" 
                onClick={skipStep}
                aria-label="Skip this step"
              >
                Skip
              </button>
            )}
            <button 
              className={`action-btn next-btn ${isSubmitting ? "submitting" : ""}`} 
              onClick={handleNext}
              disabled={isSubmitting}
              aria-label={currentStep === steps.length - 1 ? "Generate itinerary" : "Go to next step"}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                currentStep === steps.length - 1 ? "Create My Itinerary" : "Next"
              )}
            </button>
          </div>
        </div>

        {toast.show && (
          <div className={`toast ${toast.show ? "show" : ""}`}>
            <div className="toast-content">{toast.message}</div>
          </div>
        )}

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSelectPlan={handlePaymentComplete}
        />
      </div>
    </div>
  );
};

export default Wizard;