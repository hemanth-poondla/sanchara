import React, { useEffect, useRef } from 'react';

const EmojiPicker = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  
  useEffect(() => {
    if (!showPicker) return;
    
    const loadEmojiPicker = async () => {
      const { Picker } = await import('emoji-mart');
      const data = await import('@emoji-mart/data');
      
      if (pickerRef.current) {
        pickerRef.current.innerHTML = '';
        new Picker({
          data,
          onEmoji: (emoji) => {
            onSelect(emoji.native);
            setShowPicker(false);
          },
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
          previewPosition: 'none',
          skinTonePosition: 'none',
          dynamicWidth: true,
        }).mount(pickerRef.current);
      }
    };
    
    loadEmojiPicker();
  }, [showPicker, onSelect]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target) && 
          !event.target.closest('#emojiToggle')) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button 
        id="emojiToggle"
        onClick={() => setShowPicker(!showPicker)}
        className="w-12 h-10 flex items-center justify-center bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600"
      >
        😀
      </button>
      
      {showPicker && (
        <div 
          ref={pickerRef} 
          className="emoji-picker-container"
        />
      )}
    </div>
  );
};

export default EmojiPicker;