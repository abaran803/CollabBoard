import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import Header from '@src/layouts/Header';

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
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}

export default App;
