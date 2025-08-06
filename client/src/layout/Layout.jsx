import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/sideBar/SideBar';

const drawerWidth = 300;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={handleDrawerToggle} />

      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box sx={{
        width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
        marginTop:`64px`,
      
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}>

        <Outlet />
      </Box>

    </Box>
  );
};

export default Layout;
