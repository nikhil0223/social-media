import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  const isAuthenticated = token && isTokenValid(token);
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
