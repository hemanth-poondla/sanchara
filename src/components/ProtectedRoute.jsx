// components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = loading

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return setIsValid(false);

//     fetch('http://localhost:5000/api/auth/me', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => setIsValid(res.ok))
//       .catch(() => setIsValid(false));
//   }, []);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsValid(true);
  } else {
    setIsValid(false);
  }
}, []);

  if (isValid === null) return <div>Loading...</div>; // show spinner if you like
  if (!isValid) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
