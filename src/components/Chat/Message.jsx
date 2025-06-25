import React from 'react';

const Message = ({ message, onAddReaction }) => {
  return (
    <div className="message-container">
      <div className="flex justify-between items-start">
        <p className="message-sender">{message.sender}</p>
        <button 
          onClick={() => onAddReaction(message.id)}
          className="reaction-btn"
        >
          +❤️
        </button>
      </div>
      <div className="message-content">
        {message.text}
        {message.reactions?.length > 0 && (
          <div className="absolute -bottom-2 -right-2 flex space-x-1">
            {message.reactions.map((reaction, index) => (
              <span 
                key={index} 
                className="text-xs bg-white dark:bg-dark-400 px-1 rounded-full border border-gray-200 dark:border-gray-600"
              >
                {reaction.emoji} {reaction.count > 1 ? reaction.count : ''}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className="message-time">{message.time}</p>
    </div>
  );
};

export default Message;