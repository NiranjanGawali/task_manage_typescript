import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const accessToken = JSON.parse(
    sessionStorage.getItem('accessToken') || 'null'
  );
  if (!accessToken) {
    toast('Please login to access main pages');
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
