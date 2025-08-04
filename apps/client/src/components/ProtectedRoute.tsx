import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard = () => {
  const token = localStorage.getItem('jwt');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export const GuestGuard = () => {
  const token = localStorage.getItem('jwt');
  return !token ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
