// src/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Don't Starve Together Unofficial Documentation
        </Typography>
        <Button component={Link} to="/" color="inherit" sx={{ border: '1px solid white', margin: '0 4px' }}>Home</Button>
        <Button disabled component={Link} to="/" color="inherit" sx={{ border: '1px solid white', margin: '0 4px' }}>Learn LUA</Button>
        <Button disabled component={Link} to="/" color="inherit" sx={{ border: '1px solid white', margin: '0 4px' }}>Learn modding</Button>
        <Button component={Link} to="/api" color="inherit" sx={{ border: '1px solid white', margin: '0 4px' }}>API</Button>
        <Button disabled component={Link} to="/" color="inherit" sx={{ border: '1px solid white', margin: '0 4px' }}>Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar