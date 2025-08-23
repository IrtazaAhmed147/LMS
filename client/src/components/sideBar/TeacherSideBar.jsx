import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  Typography
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

const TeacherSideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  let list = [
    { url: '/', name: 'Dashboard', icon: <DashboardIcon /> },
    { url: '/course', name: 'Courses', icon: <MenuBookIcon /> },
  ];


  const handleLogout = async () => {
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      dispatch(userReset())
      navigate('/auth')
      notify('success', 'User logged out successfully')
    } catch (error) {
      console.log(error);
      notify('error', error.message)

    }
  }

  const drawerContent = (
    <Box sx={{ width: drawerWidth, p: 2, minHeight: 'calc(100vh - 64px)' }}>
      <Box>
        <Typography fontWeight={'bold'} fontSize={24}>Instructor View</Typography>
        <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }} >
          {list.map((item, i) => {
            return (
              <Link to={item.url} key={i} style={{ textDecoration: 'none' }}>
                <ListItem sx={{
                  backgroundColor: '#f9f9f9', transition: '0.3s all ease-in-out', borderRadius: '10px', '&:hover': {
                    bgcolor: '#e9e9e9ff',
                  },
                  padding: '0px',
                  color: 'black'
                }} >
                  <ListItemButton>
                    <ListItemIcon
                      sx={{ color: 'text.secondary' }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: 'bold !important', fontSize: '17px' }}>{item.name}  </Typography>
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
          <ListItem sx={{
            backgroundColor: '#f9f9f9', transition: '0.3s all ease-in-out', borderRadius: '10px', '&:hover': {
              bgcolor: '#e9e9e9ff',
            },
            padding: '0px',
            color: 'black'
          }} >
            <ListItemButton>
              <ListItemIcon
                sx={{ color: 'text.secondary' }}
              >
                <LogoutIcon/>
              </ListItemIcon>
              <Typography sx={{ fontWeight: 'bold !important', fontSize: '17px' }}>Logout</Typography>
            </ListItemButton>
          </ListItem>
        </List>

      </Box>

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

export default TeacherSideBar;
