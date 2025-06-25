import React from 'react';

const TypingIndicator = ({ name = "Vinay" }) => {
  return (
    <div className="typing-indicator">
      <span>{name} is typing</span>
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
    </div>
  );
};

export default TypingIndicator;