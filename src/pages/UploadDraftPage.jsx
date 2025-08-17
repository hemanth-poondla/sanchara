// UploadDraft.jsx — Final Polished Version with Full Validation & Theme Support

import React, { useState, useEffect, useRef } from 'react';
import '../styles/UploadDrafts/UploadDrafts.css';

const UploadDraft = () => {
  const [fallbackText, setFallbackText] = useState('');
  const [fallbackError, setFallbackError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFallbackForm, setShowFallbackForm] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
    const paid = localStorage.getItem('tripwizard_hasPaid');
    if (paid === 'true') setHasPaid(false);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF or Word (.doc/.docx) documents are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      setUploadedFile(file);
      setShowAnalysis(false);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    if (!hasPaid) setSelectedPlan(null);
    setShowAnalysis(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert('Please upload a valid itinerary document.');
      return;
    }
    if (!hasPaid && !selectedPlan) {
      alert('Please select a plan to proceed.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (uploadedFile && selectedPlan && !hasPaid) {
        setHasPaid(true);
        localStorage.setItem('tripwizard_hasPaid', 'true');
        setShowAnalysis(true);
      } else if (hasPaid && uploadedFile) {
        setShowPopup(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleReupload = () => {
    setUploadedFile(null);
    setShowPopup(false);
    setShowAnalysis(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleUseFallback = () => {
    setShowPopup(false);
    setShowFallbackForm(true);
  };

  const handleFallbackSubmit = () => {
  if (!fallbackText.trim()) {
    setFallbackError('Please describe your trip before submitting.');
    return;
  }

  if (fallbackText.length < 30) {
    setFallbackError('Please provide more details (at least 30 characters).');
    return;
  }

  setShowFallbackForm(false);
  alert("Fallback form submitted!");
  // You can send fallbackText to backend or show confirmation here
};


  return (
    <div className="upload-draft-container">
      <div className="upload-draft-card">
        <div className="upload-header">
          <div className="logo-text">TripWizard</div>
          <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <h1 className="upload-title">Upload Your Itinerary Document</h1>

        <div className="upload-content">
          <div className="upload-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="Document Icon"
              className="document-icon"
            />
            <input
              id="fileUpload"
              type="file"
              accept=".doc,.docx,.pdf"
              className="file-input"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <label htmlFor="fileUpload" className="upload-button">
              Upload .doc or .pdf
            </label>
            <p className="upload-description">
              We'll review your document and offer a customized trip plan.
            </p>

            {uploadedFile && (
              <div className="file-info fade-slide">
                <span className="file-name">{uploadedFile.name}</span>
                <button className="delete-file-button" onClick={handleDeleteFile}>
                  <svg className="trash-icon" viewBox="0 0 24 24">
                    <path d="M9 3v1H4v2h1v14a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9zm2 3v12h2V6h-2z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="right-panel">
            {!hasPaid && (
              <div className="plans-container">
                {['basic', 'standard', 'premium'].map((plan) => (
                  <div
                    key={plan}
                    className={`plan-option ${selectedPlan === plan ? 'selected' : ''}`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <div className="plan-name">{plan.charAt(0).toUpperCase() + plan.slice(1)}</div>
                    <div className="plan-price">
                      ₹ {plan === 'basic' ? '0' : plan === 'standard' ? '149' : '299'}
                    </div>
                    <div className="plan-description">
                      {plan === 'basic'
                        ? 'Review only'
                        : plan === 'standard'
                          ? 'Add places & sights'
                          : 'Full enhancements'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showAnalysis && (
              <div className="analysis-box fade-slide">
                <div className="analysis-title">Document Analysis</div>
                <ul className="analysis-data">
                  <li>Detected: 6 Days</li>
                  <li>6 Cities, 4 Regions</li>
                  <li>2 Activities Listed</li>
                </ul>
              </div>
            )}

            <button
              className={`submit-button ${(!uploadedFile || (!hasPaid && !selectedPlan)) ? 'disabled' : ''}`}
              disabled={!uploadedFile || (!hasPaid && !selectedPlan) || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? <span className="loading-spinner"></span> : 'Submit & Generate Trip'}
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Oops! Document missing trip data.</h2>
            <p>You can re-upload or use the fallback form.</p>
            <div className="popup-buttons">
              <button className="popup-button" onClick={handleReupload}>Re-upload</button>
              <button className="popup-button" onClick={handleUseFallback}>Fallback Form</button>
            </div>
          </div>
        </div>
      )}

      {showFallbackForm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Manual Trip Entry</h2>
            <textarea
              className={`fallback-textarea ${fallbackError ? 'error' : ''}`}
              placeholder="Describe your trip (e.g. Dates, Places, Preferences)"
              rows={5}
              value={fallbackText}
              onChange={(e) => {
                setFallbackText(e.target.value);
                if (fallbackError) setFallbackError('');
              }}
            />
            {fallbackError && <p className="error-text">{fallbackError}</p>}
            <div className="popup-buttons">
              <button className="popup-button" onClick={handleFallbackSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDraft;