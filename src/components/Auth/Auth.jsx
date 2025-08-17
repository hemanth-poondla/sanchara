import { useState, useEffect } from 'react';
import '../../styles/Auth/Auth.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth, provider } from '../../firebase/firebaseConfig';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const resetForm = () => {
    setFormData({ fullName: '', email: '', password: '' });
    setShowPassword(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }

      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);
      navigate("/landing");
    } catch (err) {
      console.error("Firebase auth failed:", err);
      alert("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      localStorage.setItem("token", idToken);
      navigate('/landing');
    } catch (error) {
      console.error("Google login failed:", error.message);
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div className={`auth-wrapper ${darkMode ? 'dark' : 'light'}`}>
      <div className="card">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {darkMode ? '☀️' : '🌙'}
        </button>

        <div className="logo">
          <div className="logo-icon">★</div>
          <span className="logo-text">TripWizard</span>
        </div>

        <div className="tabs">
          <div className={`tab ${isLogin ? 'active' : ''}`} onClick={() => { resetForm(); setIsLogin(true); }}>
            Log in
          </div>
          <div className={`tab ${!isLogin ? 'active' : ''}`} onClick={() => { resetForm(); setIsLogin(false); }}>
            Register
          </div>
        </div>

        <div className="heading">{isLogin ? 'Log in to your' : 'Register your'}</div>
        <div className="subheading">account</div>

        <form className="form-wrapper" onSubmit={handleSubmit} noValidate>
          <div className={`form-section active`}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && <div className="input-error">{errors.fullName}</div>}
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="input-error">{errors.email}</div>}

            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <div className="input-error">{errors.password}</div>}

            {isLogin && <div className="label-text">Forgot password?</div>}

            <button className="btn-primary" type="submit">
              {isLogin ? 'Log in' : 'Register'}
            </button>
          </div>
        </form>

        <button type="button" className="btn-primary google-btn" onClick={handleGoogleLogin}>
          <span className="google-icon">
            <svg width="20" height="20" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34-4.6-50.1H272v95h146.9c-6.4 34.3-25 63.4-53.2 83v68h85.8c50.3-46.4 82-114.8 82-195.9z" />
              <path fill="#34A853" d="M272 544.3c71.9 0 132.2-23.8 176.3-64.6l-85.8-68c-23.9 16-54.4 25.5-90.5 25.5-69.6 0-128.6-47-149.7-110.1H34.6v69.2C78.2 482.9 168.8 544.3 272 544.3z" />
              <path fill="#FBBC05" d="M122.3 326.9c-10-29.3-10-60.9 0-90.2v-69.2H34.6C12.2 205.1 0 238.9 0 278.4s12.2 73.3 34.6 110.9l87.7-62.4z" />
              <path fill="#EA4335" d="M272 107.7c38.7-.6 75.7 13.3 103.9 38.8l77.7-77.7C406.2 25 342.7 0 272 0 168.8 0 78.2 61.4 34.6 158.9l87.7 69.2c21.1-63.1 80.1-110.1 149.7-110.4z" />
            </svg>
          </span>
          Continue with Google
        </button>

        <div className="footer-text">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <span className="footer-link" onClick={() => { resetForm(); setIsLogin(!isLogin); }}>
            {isLogin ? 'Register' : 'Log in'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;