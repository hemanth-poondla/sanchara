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

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900 theme-transition">
      <Wizard />
    </div>
  );
}

export default App;