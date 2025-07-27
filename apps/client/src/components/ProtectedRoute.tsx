import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('jwt');
  return token ? children : <Navigate to="/login" replace />;
};

export const GuestGuard = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('jwt');
  return !token ? children : <Navigate to="/dashboard" replace />;
};
