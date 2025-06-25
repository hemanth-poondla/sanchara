import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import LandingPage from './pages/LandingPage';
import UploadDraft from './pages/UploadDraftPage';
import GroupChat from './pages/GroupChat';
import Wizard from './pages/WizardPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
