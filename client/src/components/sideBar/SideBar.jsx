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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../utils/HelperFunctions';
import { userReset } from '../../redux/slices/authSlice';

const SideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  let list = [
    { url: '/', name: 'Dashboard', icon: <DashboardIcon /> },
    { url: '/course', name: 'Courses', icon: <MenuBookIcon /> },
  ];

  if (user?.role === 'student') {
    list.push({ url: `/course/enrolled/${user._id}`, name: 'Enrolled Courses', icon: <PlaylistAddCheckIcon /> });
  }

  if (user?.role === 'teacher') {
    list.push(
      { url: '/single/course/create/new', name: 'Create Course', icon: <AddBoxIcon /> },
      { url: `/course/teacher/${user._id}`, name: 'Your All Courses', icon: <LibraryBooksIcon /> }
    );
  }
  let otherInfo = [
    { url: '/profile', name: 'Profile', icon: <PersonIcon /> },
  ]
  if (!user) {
    otherInfo.push(
      { url: '/login', name: 'login', icon: <LoginIcon /> },
      { url: '/signup', name: 'signup', icon: <AppRegistrationIcon /> },
    )
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      dispatch(userReset())
      navigate('/login')
      notify('success', 'User logged out successfully')
    } catch (error) {
      console.log(error);
      notify('error', error.message)

    }
  }

  const drawerContent = (
    <Box sx={{ width: drawerWidth, p: 2, marginTop: '64px', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

        {user && <ListItem disablePadding >
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              mb: 1,
              color: 'text.primary',
              '&:hover': {
                bgcolor: '#e3f2fd',
              },
            }}
          >
            <ListItemIcon
              sx={{ color: 'text.secondary' }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'logout'} />
          </ListItemButton>
        </ListItem>}
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
