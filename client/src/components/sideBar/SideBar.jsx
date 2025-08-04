import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// MUI Icons (you can change icons as needed)
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function SideBar() {
  const location = useLocation();

  const list = [
    { url: '/', name: 'Dashboard', icon: <DashboardIcon /> },
    { url: '/courses', name: 'Courses', icon: <MenuBookIcon /> },
    { url: '/enrolled', name: 'Enrolled Courses', icon: <PlaylistAddCheckIcon /> },
    { url: '/create-course', name: 'Create Course', icon: <AddBoxIcon /> },
    { url: '/all-courses', name: 'Your All Course', icon: <LibraryBooksIcon /> },
    { url: '/profile', name: 'Profile', icon: <AccountCircleIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        borderRight: '1px solid #e0e0e0',
        minHeight: '100vh',
        bgcolor: '#f9f9f9',
        p: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        LMS Panel
      </Typography>

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
    </Box>
  );
}

export default SideBar;
