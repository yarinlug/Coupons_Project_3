import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { Button } from '@mui/material';
import AuthMenu from '../../../AuthArea/AuthMenu/AuthMenu';
import { useEffect, useState } from 'react';
import { authStore } from '../../../../Redux/OurStore';


function AdminNavBar(): JSX.Element {
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (authStore.getState().user != null) {
      setName(authStore.getState().user.name);
    } else {
      setName("Guest!");
    }
    const unsubscribe = authStore.subscribe(() => {
        if (authStore.getState().user != null) {
          setName(authStore.getState().user.name);
        } else {
          setName("Guest!");
        }
      });
  
      return () => {
          unsubscribe();
      };
    }, []);
  const pages = ['Companies', 'Customers', 'Home'];
 

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="AdminNavBar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
             
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src="/logo-color.png" alt="Logo" style={{ height: '70px', width: '90px' }} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography component={NavLink} to={page} textAlign="center" variant="h6" noWrap sx={{ textDecoration: 'none', color: 'inherit' }}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src="/logo-color.png" alt="Logo" style={{ height: '70px', width: '90px' }} />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, mx: 20, color: 'white', display: 'block' }}
                  component={NavLink}
                  to={page === 'Home' ? '/homepage' : `/${page.toLowerCase()}`}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
            <Typography variant="h6" sx={{ color: "white", marginLeft: "auto" }}>
                Hello {name}
              </Typography>
              <AuthMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AdminNavBar;
