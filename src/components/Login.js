// src/components/Login.js

import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';

// 1. Import your background image
import dogBg from '../assets/Leooo.jpg'; // Adjust the path if needed

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
    // 2. Use a full-width, full-height container with a background
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundImage: `url(${dogBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 3. Place content in a Box that centers everything */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        {/* 4. Add the slogan */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: '#fff',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Your woof woof member is just a click away 🐶
        </Typography>

        {/* 5. Semi-transparent box to hold the login form */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom align="center">
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
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
