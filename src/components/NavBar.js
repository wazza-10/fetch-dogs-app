import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(to right, #FF6F61, #FFC107)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        height: 64,
        justifyContent: 'center',
      }}
    >
      <Toolbar>
        <PetsIcon sx={{ mr: 1, fontSize: '1.8rem' }} />
        <Typography
          variant="h6"
          component={Link}
          to="/login"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Woof Finder
        </Typography>

        <IconButton
          sx={{
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <PetsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
