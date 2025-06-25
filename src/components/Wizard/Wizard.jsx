import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Wizard/Wizard.css";

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

  const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API;

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    );

    if (!existingScript && GOOGLE_MAP_API_KEY) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        console.log("Google Maps API loaded successfully");
        setMapsLoaded(true);
      };
      script.onerror = () => {
        console.error("Google Maps failed to load");
        setMapsLoaded(false);
      };
      document.head.appendChild(script);
    } else if (window.google) {
      setMapsLoaded(true);
    }
  }, [GOOGLE_MAP_API_KEY]);

  const steps = [
    { title: "Let's start your journey ✈️", subtitle: "Where are you flying from?", type: "origin", key: "origin", isRequired: true },
    { title: "Destination dreams 🌍", subtitle: "Where do you want to go? (or say 'Surprise me!')", type: "destination", key: "destination", isRequired: false },
    { title: "Travel companions 👨‍👩‍👧‍👦", subtitle: "Who's joining this adventure?", type: "single", key: "travelers", options: [ { label: "Solo" }, { label: "Couple" }, { label: "Friends" }, { label: "Family" } ], isRequired: true },
    { title: "Vibe check 💃", subtitle: "Pick 1–3 things you're most excited for", type: "multi", key: "vibe", options: [ { emoji: "🏖️", label: "Beach relax" }, { emoji: "🏛️", label: "Culture" }, { emoji: "🌲", label: "Nature" }, { emoji: "🍜", label: "Foodie" }, { emoji: "🎉", label: "Party" } ], minSelections: 1, maxSelections: 3 },
    { title: "Budget style 💸", subtitle: "How fancy are we getting?", type: "single", key: "budget", options: [ { symbol: "₹", label: "Budget" }, { symbol: "₹₹", label: "Comfort" }, { symbol: "₹₹₹", label: "Luxury" } ], isRequired: true },
    { title: "Date certainty 📅", subtitle: "Do you have fixed travel dates?", type: "single", key: "dateCertainty", options: [ { emoji: "✅", label: "Yes, exact dates" }, { emoji: "❓", label: "No, flexible" } ], isRequired: true },
    { title: "Exact travel dates 🗓️", subtitle: "Select your start and end dates", type: "dateRange", key: "exactDates", condition: (data) => data.dateCertainty === "Yes, exact dates" },
    { title: "Flexible planning 🌈", subtitle: "Pick your ideal month and duration", type: "flexibleDates", key: "flexibleDates", condition: (data) => data.dateCertainty === "No, flexible", children: [ { title: "Preferred month", type: "monthPicker", key: "month" }, { title: "Trip duration", type: "dayRange", key: "days", options: ["3-5 days", "1 week", "10 days", "2 weeks+"] } ] },
    { title: "Final touch ✨", subtitle: "Any special requirements?", type: "multi", key: "specialNeeds", options: [ { label: "Wheelchair accessible" }, { label: "Pet friendly" }, { label: "Vegetarian/vegan" }, { label: "Allergy concerns" } ], isRequired: false },
    { title: "Almost there! 🎉", subtitle: "Review your selections below", type: "confirmation", key: "confirm" }
  ];

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const goToNextValidStep = (dir = 1) => {
    let next = currentStep + dir;
    while (steps[next] && steps[next].condition && !steps[next].condition(data)) {
      next += dir;
    }
    if (next >= 0 && next < steps.length) setCurrentStep(next);
  };

  const handleNext = () => {
    const step = steps[currentStep];
    if (step.isRequired && (!data[step.key] || data[step.key].length === 0)) {
      showToast("This field is required");
      return;
    }
    if (step.type === "multi" && step.minSelections && data[step.key].length < step.minSelections) {
      showToast(`Pick at least ${step.minSelections}`);
      return;
    }
    if (step.type === "dateRange" && (!data.exactDates.start || !data.exactDates.end)) {
      showToast("Pick both start and end dates");
      return;
    }
    goToNextValidStep(1);
  };

  const handleBack = () => goToNextValidStep(-1);
  const skipStep = () => goToNextValidStep(1);

  const handleChange = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setData((prev) => ({ ...prev, exactDates: { start, end } }));
  };

  const toggleSelection = (key, value) => {
    const current = data[key] || [];
    const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    handleChange(key, updated);
  };

  // Component renderers
  const renderLocationInput = (step) => {
    if (!mapsLoaded) {
      return (
        <input
          type="text"
          value={data[step.key]}
          onChange={(e) => handleChange(step.key, e.target.value)}
          className="location-input"
          placeholder={step.subtitle}
        />
      );
    }

    return (
      <PlacesAutocomplete
        value={data[step.key]}
        onChange={(value) => handleChange(step.key, value)}
        onSelect={(value) => handleChange(step.key, value)}
        searchOptions={{
          types: ['(cities)'],
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete-container">
            <input
              {...getInputProps({
                className: "location-input",
                placeholder: step.subtitle,
              })}
            />
            <div className="autocomplete-dropdown">
              {loading && <div className="suggestion-item">Loading...</div>}
              {suggestions.map((suggestion, index) => (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: suggestion.active
                      ? "suggestion-item active"
                      : "suggestion-item",
                  })}
                  key={index}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  };

  const renderStep = () => {
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
                className={`option-btn ${
                  data[step.key] === opt.label ? "selected" : ""
                }`}
                onClick={() => handleChange(step.key, opt.label)}
              >
                {opt.emoji || opt.symbol ? (
                  <span className="emoji">{opt.emoji || opt.symbol}</span>
                ) : null}
                {opt.label}
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
                className={`option-btn ${
                  data[step.key]?.includes(opt.label) ? "selected" : ""
                }`}
                onClick={() => toggleSelection(step.key, opt.label)}
              >
                {opt.emoji ? <span className="emoji">{opt.emoji}</span> : null}
                {opt.label}
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
              monthsShown={2}
            />
          </div>
        );

      case "flexibleDates":
        return (
          <div className="flexible-dates-container">
            <div className="month-picker">
              <h4>{step.children[0].title}</h4>
              <select
                value={data.flexibleDates.month}
                onChange={(e) =>
                  handleChange("flexibleDates", {
                    ...data.flexibleDates,
                    month: e.target.value,
                  })
                }
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
            </div>
            <div className="day-range">
              <h4>{step.children[1].title}</h4>
              <div className="options-grid">
                {step.children[1].options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${
                      data.flexibleDates.days === opt ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleChange("flexibleDates", {
                        ...data.flexibleDates,
                        days: opt,
                      })
                    }
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
              { label: "From", value: data.origin },
              { label: "To", value: data.destination || "Surprise me!" },
              { label: "Travelers", value: data.travelers },
              { label: "Vibe", value: data.vibe.join(", ") },
              { label: "Budget", value: data.budget },
              {
                label: "Dates",
                value:
                  data.dateCertainty === "Yes, exact dates" &&
                  data.exactDates.start &&
                  data.exactDates.end
                    ? `${data.exactDates.start.toLocaleDateString()} to ${data.exactDates.end.toLocaleDateString()}`
                    : data.dateCertainty === "No, flexible"
                    ? `${data.flexibleDates.month} for ${data.flexibleDates.days}`
                    : "Not specified",
              },
              { 
                label: "Special Needs", 
                value: data.specialNeeds.length > 0 
                  ? data.specialNeeds.join(", ") 
                  : "None specified" 
              },
            ].map(({ label, value }, i) => (
              <div key={i} className="confirmation-item">
                <h4>{label}</h4>
                <p>{value}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="trip-wizard">
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
        <span className="progress-text">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="card">
        <h1 className="title">{steps[currentStep].title}</h1>
        <p className="subtitle">{steps[currentStep].subtitle}</p>

        {renderStep()}

        <div className="actions">
          {currentStep > 0 && (
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
          )}
          {!steps[currentStep].isRequired &&
            currentStep !== steps.length - 1 && (
              <button className="back-btn" onClick={skipStep}>
                Skip
              </button>
            )}
          <button className="next-btn" onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Create My Itinerary" : "Next"}
          </button>
        </div>
      </div>

      {toast.show && (
        <div className={`toast ${toast.show ? "show" : ""}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Wizard;
