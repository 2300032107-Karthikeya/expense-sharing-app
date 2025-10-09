// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; // If logged in, render the component
};

export default ProtectedRoute;