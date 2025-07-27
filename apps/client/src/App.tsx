import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/Header/Header';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import Register from '@pages/Register';
import TokenHandler from '@pages/TokenHandler';
import { AuthGuard, GuestGuard } from '@components/ProtectedRoute';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route path="/dashboard/token" element={<TokenHandler />} />
        <Route
          path="/login"
          element={
            <GuestGuard>
              <Login />
            </GuestGuard>
          }
        />
        <Route
          path="/register"
          element={
            <GuestGuard>
              <Register />
            </GuestGuard>
          }
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
