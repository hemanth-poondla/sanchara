import React from 'react';
import MemberAvatars from './MemberAvatars';

const Poll = ({ poll, members, onVote }) => {
  return (
    <div className="message-container">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">You created a poll</p>
      <div className="poll-container">
        <p className="poll-question">{poll.question}</p>
        <div className="poll-options">
          {poll.options.map((option, index) => (
            <button 
              key={index}
              onClick={() => onVote(index, poll.id)}
              className="poll-option"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-1 mt-2">
          <MemberAvatars members={members} />
        </div>
        <p className="text-xs text-right text-gray-600 dark:text-gray-400">{poll.time}</p>
      </div>
    </div>
  );
};

export default Poll;