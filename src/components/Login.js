import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { keyframes } from '@emotion/react';
import PetsIcon from '@mui/icons-material/Pets';

import { loginUser } from '../services/api';
import dogBg from '../assets/Leooo.jpg';

const floatGradient = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-45%, -55%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`;
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const Login = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(name, email);
      onLoginSuccess();
      navigate('/search');
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundImage: `url(${dogBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        pt: '64px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)',
          animation: `${floatGradient} 8s ease-in-out infinite`,
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          flex: 1,
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            }}
          >
            Your woof woof member is just a click away 🐶
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              color: '#fff',
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            Dog Lovers Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 1,
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 1,
              }}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #FF6F61, #FFC107)',
                color: '#fff',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': {
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, #FF6F61, #FFC107)',
                },
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          gap: 1,
        }}
      >
        <Box sx={{ animation: `${bounce} 2s infinite` }}>
          <PetsIcon />
        </Box>
        <Typography variant="body2" fontWeight="bold">
          © {new Date().getFullYear()} Fetch Rewards
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
