import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginProtectedRoute = ({ children }: { children: ReactNode }) => {
  const accessToken = JSON.parse(
    sessionStorage.getItem('accessToken') || 'null'
  );

  if (accessToken) {
    toast('You are already logged in.');
    return <Navigate to='/dashboard' />;
  }

  return <>{children}</>;
};

export default LoginProtectedRoute;
