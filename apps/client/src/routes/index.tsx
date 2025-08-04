import App from '../App.tsx';
import { AuthGuard, GuestGuard } from '@components/ProtectedRoute.tsx';
import Dashboard from '@pages/Dashboard.tsx';
import TokenHandler from '@pages/TokenHandler.tsx';
import Login from '@pages/Login.tsx';
import Register from '@pages/Register.tsx';
import { Navigate } from 'react-router';

export default [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: 'user',
        element: <AuthGuard />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
        ],
      },
      {
        path: '/auth',
        element: <GuestGuard />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: 'dashboard/token',
        element: <TokenHandler />,
      },
    ],
  },
];
