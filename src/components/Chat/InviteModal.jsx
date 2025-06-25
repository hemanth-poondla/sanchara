import React from 'react';

const InviteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          onClick={onClose} 
          className="modal-close"
        >
          &times;
        </button>
        <h3 className="modal-title">Invite friends</h3>
        <input 
          type="email" 
          placeholder="Enter their email..." 
          className="modal-input"
        />
        <button className="btn btn-primary w-full mb-3">
          Send Invite
        </button>
        <button className="btn btn-secondary w-full mb-3">
          Generate invite link
        </button>
        <textarea 
          placeholder="Add a friendly message..." 
          className="modal-textarea" 
          rows="4"
        ></textarea>
        <p className="modal-footer">
          Invite others to join your trip and add their own stories and expenses.
        </p>
      </div>
    </div>
  );
};

export default InviteModal;