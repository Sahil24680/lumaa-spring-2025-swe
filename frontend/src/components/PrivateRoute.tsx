import React from 'react';
import { Navigate } from 'react-router-dom';

// Props for PrivateRoute component
interface PrivateRouteProps {
  children: React.ReactNode;
}

// Protects routes by checking for authentication token
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Get token from local storage
  const token = localStorage.getItem('accessToken');
  
  // If no token is found, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  // If token exists allow access to the protected route
  return <>{children}</>;
};

export default PrivateRoute;
