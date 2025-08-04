import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      navigate('/user/dashboard', { replace: true });
    } else {
      navigate('/auth/login', { replace: true });
    }
  }, [navigate]);

  return null;
};

export default TokenHandler;
