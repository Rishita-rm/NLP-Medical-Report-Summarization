import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03e9f4]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/contact" replace />;
  }

  return children;
};

export default PrivateRoute; 