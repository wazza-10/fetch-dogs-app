// src/components/NavBar.js

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        // 1) Gradient background
        background: 'linear-gradient(to right, #FF6F61, #FFC107)',
        // 2) Subtle box shadow for depth
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        // 3) (Optional) Increase or decrease height if you like
        height: 64,
        justifyContent: 'center',
      }}
    >
      <Toolbar>
        {/* Paw icon at the start */}
        <PetsIcon sx={{ mr: 1, fontSize: '1.8rem' }} />

        {/* NavBar Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: '1.4rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Woof Finder
        </Typography>

        {/* Example Icon Button (could be a link, logout, or anything else) */}
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
