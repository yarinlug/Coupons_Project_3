import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

import { Route } from 'react-router-dom';
import { authStore } from '../../../Redux/OurStore';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';



const pages = [
  { label: 'Our Coupons', path: '/homepage' },
];

function Navbar() {
 

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <img src="/logo-color.png" alt="Logo" style={{ height: '70px', width: '70px' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, mx: 60, color: 'white', display: 'block', textTransform: 'none' }}
                component={NavLink}
                to={page.path}
              >
                {page.label}
              </Button>
            ))}
          </Box>
              
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Typography variant="h6" sx={{ color: "white", marginLeft: "auto" }}>
              Hello Guest!
            </Typography>
            <AuthMenu/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
