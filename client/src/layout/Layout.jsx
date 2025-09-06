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
    
    
    
    
    <>
      <Navbar onMenuClick={handleDrawerToggle} />
        <Outlet />
      </>

    
  );
};

export default Layout;
