import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const location = useLocation();
  const list = [
    { url: '/', name: 'Dashboard', icon: <DashboardIcon /> },
    { url: '/course', name: 'Courses', icon: <MenuBookIcon /> },
    { url: '/course/enrolled/:id', name: 'Enrolled Courses', icon: <PlaylistAddCheckIcon /> },
    { url: '/create-course', name: 'Create Course', icon: <AddBoxIcon /> },
    { url: '/course/teacher/:id', name: 'Your All Course', icon: <LibraryBooksIcon /> },
  ];

  const otherInfo = [
    { url: '/profile', name: 'Profile', icon: <PersonIcon /> },
    // { url: '/login', name: 'login', icon: <LoginIcon /> },
    // { url: '/signup', name: 'signup', icon: <AppRegistrationIcon /> },
    { url: '/logout', name: 'logout', icon: <LogoutIcon /> },
  ]

  const drawerContent = (
    <Box sx={{ width: drawerWidth, p: 2, marginTop: '64px', minHeight: 'calc(100vh - 64px)',display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>

        <List>
          {list.map((item, i) => {
            const isActive = location.pathname === item.url;
            return (
              <Link to={item.url} key={i} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      color: isActive ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        bgcolor: '#e3f2fd',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
        <Divider />
      </Box>
      <List>
        {otherInfo.map((item, i) => {
          const isActive = location.pathname === item.url;
          return (
            <Link to={item.url} key={i} style={{ textDecoration: 'none' }}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={isActive}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    color: isActive ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      bgcolor: '#e3f2fd',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              overflow: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              overflow: 'hidden',
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
