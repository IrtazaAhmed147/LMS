import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/HelperFunctions';
import { useDispatch } from 'react-redux';

const Navbar = ({ onMenuClick }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (

    <>

      <AppBar sx={{ padding: '15px 10px', position: 'relative', flexDirection: 'row', background: '#fff', color: "black", display: 'flex !important',flexWrap:'wrap',gap:1, justifyContent: 'space-between', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
        <Box sx={{ display: 'flex', width: 'auto', gap: '10px', alignItems: 'center' }}>
          <SchoolOutlinedIcon fontSize="large" />
          <Link to={'/'}>
          <Typography fontWeight={'bold'} color='#000' variant='h6'>LMS LEARN</Typography>
          </Link>
          <Link to={'/courses'}>
            <button style={{ cursor:'pointer',backgroundColor: "#696969ff", color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', width: 'auto', padding: '10px 20px',fontSize:'16px',  margin: 0 }}>Explore Courses</button>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', width: 'auto', gap: '10px', alignItems: 'center' }}>
          <Typography fontWeight={'bold'} variant='h6'>My Courses</Typography>
          <OndemandVideoIcon fontSize="large" />
          <button onClick={()=> handleLogout(dispatch, navigate)} style={{ cursor:'pointer',backgroundColor: "#000", color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', width: 'auto', padding: '10px 20px',fontSize:'16px',  margin: 0 }}>Sign Out</button>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
