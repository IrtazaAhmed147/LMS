import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../utils/HelperFunctions';
import { toggleDashboardState } from '../../redux/slices/dashboardSlice';

const TeacherSideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let list = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Courses', icon: <MenuBookIcon /> },
    { name: 'Logout', icon: <LogoutIcon /> },
  ];




  const handleClick = async(name)=> {
    if(name=== 'Logout') {
      handleLogout(dispatch, navigate)
    } else if ( name === 'Dashboard' ) {
      dispatch(toggleDashboardState(true))
    } else if(name === "Courses") {
      dispatch(toggleDashboardState(false))
      
    }
   }

  const drawerContent = (
    <Box sx={{ width: drawerWidth, p: 2, minHeight: 'calc(100vh - 64px)' }}>
      <Box>
        <Typography fontWeight={'bold'} fontSize={24}>Instructor View</Typography>
        <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }} >
          {list.map((item, i) => {
            return (

              <ListItem onClick={()=>handleClick(item.name)} key={i} sx={{
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

            );
          })}
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
