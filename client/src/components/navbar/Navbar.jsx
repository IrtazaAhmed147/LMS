import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const Navbar = ({ onMenuClick }) => {
  return (
   
    <>
    
      <AppBar sx={{padding:'15px 10px',position:'relative',flexDirection:'row',background:'#fff',color:"black",display:'flex !important',justifyContent:'space-between', boxShadow:'none', borderBottom:'1px solid #ddd'}}>
        <Box sx={{display:'flex',width:'auto', gap:'10px', alignItems:'center'}}>
          <SchoolOutlinedIcon fontSize="large"/>
            <Typography fontWeight={'bold'} variant='h6'>LMS LEARN</Typography>
            <button style={{backgroundColor: "#696969ff" , width:'auto', padding:'5px 10px',margin:0}}>Explore Courses</button>
        </Box>
        <Box sx={{display:'flex',width:'auto', gap:'10px', alignItems:'center'}}>
            <Typography fontWeight={'bold'} variant='h6'>My Courses</Typography>
          <OndemandVideoIcon fontSize="large"/>
            <button style={{backgroundColor: "#000" , width:'auto', padding:'5px 10px',margin:0}}>Sign Out</button>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
