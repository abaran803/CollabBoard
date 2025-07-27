import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

const Header = () => {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    // Optionally call backend logout endpoint here
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CollabBoard
        </Typography>
        {!token && (
          <Stack direction="row" spacing={2}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Stack>
        )}
        {token && (
          <Stack direction="row" spacing={2}>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
