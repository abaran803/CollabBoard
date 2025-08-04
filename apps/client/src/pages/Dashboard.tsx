import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      window.history.replaceState({}, '', '/user/dashboard');
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to your Dashboard!
        </Typography>
        <Typography variant="body1">
          Here you can manage your projects, collaborate, and more.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
