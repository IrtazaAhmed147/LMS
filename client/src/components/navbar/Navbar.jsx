import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = ({ onMenuClick }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  return (

    <>

      <AppBar sx={{ padding: {md:'15px 10px',xs:'10px 5px'}, position: 'relative', flexDirection: 'row', background: '#fff', color: "black", display: 'flex !important',flexWrap:'wrap',gap:1, justifyContent: 'space-between', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
        <Box className='navBox' sx={{  gap: {md:'10px',xs:'5px'},  }}>
          <Link to={'/'} style={{color:'black',display:'flex',alignItems: 'center' }}>
          <SchoolOutlinedIcon   sx={{fontSize:{md:'30px', sm:'25px',xs:'20px'}}} />
          <Typography  fontWeight={'bold'} color='#000' sx={{fontSize:{sm:'20px',xs:'14px',md:'30px',marginLeft:'10px'}}} >LMS LEARN</Typography>
          </Link>
          <Link to={'/courses'}>
            <button className='common-btn big-btn' style={{backgroundColor: "#696969ff"}}>Explore Courses</button>
          </Link>
        </Box>
        <Box className='navBox' sx={{  gap: '10px',  }}>
          <Link to={`/course/enrolled/${user?._id}`} style={{color:'black',display:'flex',alignItems: 'center' }}>
          <Typography  fontWeight={'bold'} sx={{fontSize:{sm:'20px',xs:'14px',md:'30px'}}} marginRight={'10px'}>My Courses</Typography>
          <OndemandVideoIcon  sx={{fontSize:{md:'30px', sm:'25px',xs:'20px'}}} />
          </Link>
          <button  className='common-btn big-btn' onClick={()=> handleLogout(dispatch, navigate)} >Sign Out</button>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
