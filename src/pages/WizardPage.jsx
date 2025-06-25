import React, { useState, useEffect } from 'react';
import Wizard from '../components/Wizard/Wizard';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    setDarkMode(true);
    document.body.classList.add('dark-theme'); // ✅ fix here
  }
}, []);

const toggleTheme = () => {
  const newDarkMode = !darkMode;
  setDarkMode(newDarkMode);
  document.body.classList.toggle('dark-theme'); // ✅ fix here
  localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
};

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900 theme-transition">
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleTheme}
          className="px-4 py-1 border rounded-full text-sm font-medium border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-dark-300 dark:text-gray-200 dark:border-gray-600"
        >
          Toggle Theme
        </button>
      </div>
      <Wizard />
    </div>
  );
}

export default App;