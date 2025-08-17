import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Itinerary/DayItinerary.css';

const DayItinerary = ({
  date,
  weather,
  highlights,
  activities,
  expenses,
  blogNotes,
  onAddExpense,
  onSaveNotes
}) => {
  const [expandedExpense, setExpandedExpense] = useState(false);
  const [noteText, setNoteText] = useState(blogNotes?.text || '');
  const [noteImages, setNoteImages] = useState(blogNotes?.images || []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, caption: '' }));
    setNoteImages([...noteImages, ...newImages]);
  };

  const handleCaptionChange = (index, value) => {
    const updated = [...noteImages];
    updated[index].caption = value;
    setNoteImages(updated);
  };

  return (
    <div className="day-itinerary">
      {/* Header */}
      <div className="day-header">
        <h2>{date}</h2>
        <div className="weather">
          <span>{weather.temp}&deg;C</span>
          <small>{weather.note}</small>
        </div>
      </div>

      {/* Highlights */}
      <div className="highlights">
        <p>{highlights}</p>
      </div>

      {/* Activities */}
      <div className="activities">
        <h3>Activities</h3>
        <ul>
          {activities.map((act, idx) => (
            <li key={idx}>
              <span className="time">{act.time}</span>
              <span className="desc">{act.description}</span>
              <span className="icon">{act.icon}</span>
              <span className="transport">{act.transport}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expenses */}
      <div className="expenses">
        <h3>Expenses</h3>
        <div className="expense-log">
          {expenses.map((exp, idx) => (
            <div className="expense-item" key={idx}>
              <span className="title">{exp.title}</span>
              <span className="payer">{exp.payer}</span>
              <span className="amount">₹{exp.amount}</span>
            </div>
          ))}
        </div>
        <button className="toggle-expense" onClick={() => setExpandedExpense(!expandedExpense)}>
          {expandedExpense ? 'Close' : '+ Add Expense'}
        </button>

        {expandedExpense && (
          <div className="expense-form">
            <input type="text" placeholder="Description" />
            <input type="number" placeholder="Amount" />
            <button onClick={onAddExpense}>Add</button>
          </div>
        )}
      </div>

      {/* Blog Notes */}
      <div className="blog-notes">
        <h3>Blog Notes</h3>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your memories here..."
        />

        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        <div className="blog-photos">
          {noteImages.map((img, idx) => (
            <div className="photo-entry" key={idx}>
              <img src={URL.createObjectURL(img.file)} alt="upload" />
              <input
                type="text"
                placeholder="Caption"
                value={img.caption}
                onChange={(e) => handleCaptionChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button onClick={() => onSaveNotes({ text: noteText, images: noteImages })}>Save Notes</button>
      </div>
    </div>
  );
};

DayItinerary.propTypes = {
  date: PropTypes.string.isRequired,
  weather: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    note: PropTypes.string
  }).isRequired,
  highlights: PropTypes.string,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.string,
      transport: PropTypes.string
    })
  ).isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      payer: PropTypes.string,
      amount: PropTypes.number
    })
  ).isRequired,
  blogNotes: PropTypes.shape({
    text: PropTypes.string,
    images: PropTypes.array
  }),
  onAddExpense: PropTypes.func,
  onSaveNotes: PropTypes.func
};

DayItinerary.defaultProps = {
  blogNotes: { text: '', images: [] },
  onAddExpense: () => {},
  onSaveNotes: () => {}
};

export default DayItinerary;
