import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// ✅ Import fonts locally (no CDN required)
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/jost/600.css';

// ✅ Import styles
import './styles/tripwizard-theme.css'; // Your theme styles
import './index.css'; // Tailwind or base resets (if any)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
