import {
  Drawer,
  Box,
  List,
  ListItem,
  Typography,
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateCategories, updateLanguage } from '../../redux/slices/courseSlice';
import CancelIcon from '@mui/icons-material/Cancel';

const CourseSideBar = ({ drawerWidth, mobileOpen,setMobileOpen, handleDrawerToggle, isMobile }) => {
  const dispatch = useDispatch()
  const [lang, setLang] = useState([])
  const { categories } = useSelector(
    (state) => state.course
  );
  console.log(categories);

  const [categoriesState, setCategoriesState] = useState(categories)

  console.log(categoriesState);


  const categoriesArr = [
    'Web Development',
    'Backend Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'Cyber Security',
    'Mobile Development',
    'Game Development',
    'Software Engineering',
  ]



  const handleLanguageFilter = (e) => {
    const { value, checked } = e.target;

    setLang((prev) => {
      let updated;
      if (checked) {
        updated = [...prev, value];
      } else {
        updated = prev.filter((item) => item !== value);
      }
      dispatch(updateLanguage(updated)); // ab hamesha latest value milegi
      console.log(updated);

      return updated; // state bhi update ho rahi hai
    });

  };
  const handleCatFilter = (e) => {
    const { value, checked } = e.target;

    setCategoriesState((prev) => {
      let updated;
      if (checked) {
        updated = [...prev, value];
      } else {
        updated = prev.filter((item) => item !== value);
      }

      dispatch(updateCategories(updated));
      console.log(updated);

      return updated;
    });

  };




  const drawerContent = (
    <Box id='drawer' sx={{ width: drawerWidth, p: 2, minHeight: 'calc(100vh - 64px)' }}>
      <Box>
        <Box sx={{display:{md:'none',xs:'flex'}, width:'100%', justifyContent:'space-between',alignContent:'center'}}>

        <Typography fontWeight={'bold'} fontSize={24}>All Courses</Typography>
        <span onClick={()=> setMobileOpen(false)} style={{marginRight:'30px',alignContent:'center'}}>
          <CancelIcon />
        </span>
        </Box>


        <Typography fontWeight={'bold'} fontSize={14}>CATERGORY</Typography>
        <List>
          {categoriesArr.map((category, i) => (
            <ListItem key={i} sx={{ padding: 0 }}>
              <label style={{ display: 'flex', gap: '5px' }}>

                <input type="checkbox" onChange={handleCatFilter}
                  checked={categories.includes(category)} value={category} /> {category}
              </label>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography fontWeight={'bold'} fontSize={14}>PRIMARY LANGUAGE</Typography>
        <List>

          <ListItem sx={{ padding: 0 }}>
            <label style={{ display: 'flex', gap: '5px' }}>
              <input type="checkbox" onChange={handleLanguageFilter}
                checked={lang.includes("english")} value={`english`} />English
            </label>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <label style={{ display: 'flex', gap: '5px' }}>

              <input type="checkbox" onChange={handleLanguageFilter}
                checked={lang.includes("urdu")} value={`urdu`} />Urdu
            </label>

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
        disableAutoFocus
          anchor="left"
          disableEnforceFocus
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            position: 'relative',
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              overflow: 'hidden',
              // position: 'relative',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
        
          anchor="left"
          disableEnforceFocus
          variant="permanent"
          sx={{
            position: 'relative',
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              overflow: 'hidden',
              boxSizing: 'border-box',
              position: 'relative',
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

export default CourseSideBar;
