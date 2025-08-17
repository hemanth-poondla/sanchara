import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import Poll from './Poll';
import TypingIndicator from './TypingIndicator';
// import EmojiPicker from './EmojiPicker';
import InviteModal from './InviteModal';
import MemberAvatars from './MemberAvatars';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const typingTimeout = useRef(null);
  const chatBoxRef = useRef(null);

  const members = [
    { id: 1, name: "Vinay", avatar: "https://i.pravatar.cc/36?img=1" },
    { id: 2, name: "Shalini", avatar: "https://i.pravatar.cc/36?img=2" },
    { id: 3, name: "Mahesh", avatar: "https://i.pravatar.cc/36?img=3" },
    { id: 4, name: "H", avatar: "", initials: "H" },
  ];

  useEffect(() => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages([{
      id: Date.now(),
      sender: "TripWizard",
      text: "Welcome to your trip planning group! Let's start organizing our adventure 🗺️",
      time: time,
      reactions: []
    }]);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (!isTyping) setIsTyping(true);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setIsTyping(false), 2000);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: "You",
      text: inputText,
      time: time,
      reactions: []
    }]);
    
    setInputText('');
    setIsTyping(false);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
  };

  const addReaction = (messageId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existing = msg.reactions.find(r => r.emoji === '❤️');
        if (existing) {
          return {
            ...msg,
            reactions: msg.reactions.map(r => 
              r.emoji === '❤️' ? {...r, count: r.count + 1} : r
            )
          };
        }
        return {
          ...msg,
          reactions: [...msg.reactions, { emoji: '❤️', count: 1 }]
        };
      }
      return msg;
    }));
  };

  const addPoll = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: "You",
      isPoll: true,
      question: "Is everyone free from Sept 5–12?",
      options: ["Yes", "No"],
      votes: [],
      time: time,
      reactions: []
    }]);
  };

  const vote = (optionIndex, messageId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.isPoll) {
        return {
          ...msg,
          votes: [...msg.votes, { memberId: 1, option: optionIndex }]
        };
      }
      return msg;
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setInputText(prev => prev + emoji);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="chat-title">Group Chat</h2>
        <div className="flex items-center gap-4">
          <MemberAvatars members={members} />
          <button 
            onClick={() => setShowInviteModal(true)}
            className="text-lime-600 dark:text-lime-300 text-sm underline font-medium"
          >
            + Invite Friends
          </button>
        </div>
      </div>

      <div ref={chatBoxRef} className="message-area">
        {messages.map((message) => (
          message.isPoll ? (
            <Poll 
              key={message.id} 
              poll={message} 
              members={members} 
              onVote={vote} 
            />
          ) : (
            <Message 
              key={message.id} 
              message={message} 
              onAddReaction={addReaction} 
            />
          )
        ))}
      </div>

      <div className="input-area">
        <input
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="message-input"
        />
        
        {/* <EmojiPicker onSelect={handleEmojiSelect} /> */}
        
        <button 
          onClick={sendMessage}
          className="btn btn-primary1"
        >
          Send
        </button>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 italic h-5">
          {isTyping && <TypingIndicator name="Vinay" />}
        </div>
        <div className="action-buttons">
        <div className="button-group">
          <button 
            onClick={addPoll}
            className="btn btn-secondary"
          >
            + Poll
          </button>
          <button className="btn btn-secondary">
            Generate
          </button>
        </div>
        <div className="status-message">
          ⚡ Waiting for 2 more adventurers to join...
        </div>
      </div>
      </div>
      
      <InviteModal 
        isOpen={showInviteModal} 
        onClose={() => setShowInviteModal(false)}
      />
    </div>
  );
};

export default ChatContainer;