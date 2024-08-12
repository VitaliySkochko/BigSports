// RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const RequireAuth = ({ children, adminOnly }) => {
  const { user, userData } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (adminOnly && userData?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
