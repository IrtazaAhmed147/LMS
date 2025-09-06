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

const CourseSideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const dispatch = useDispatch()
  const [lang, setLang] = useState([])
  const [categories, setCategories] = useState([])


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

    setCategories((prev) => {
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
    <Box id='drawer' sx={{ width: drawerWidth, p: 2, position: 'relative', minHeight: 'calc(100vh - 64px)' }}>
      <Box>
        <Typography fontWeight={'bold'} fontSize={24}>All Courses</Typography>


        <Typography fontWeight={'bold'} fontSize={14}>CATERGORY</Typography>
        <List>
          {categoriesArr.map((category, i) => (
            <ListItem key={i} sx={{ padding: 0 }}>
              <label >

                <input type="checkbox" onChange={handleCatFilter}
                  checked={categories.includes(category.toLowerCase())} value={category.toLowerCase()} /> {category}
              </label>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography fontWeight={'bold'} fontSize={14}>PRIMARY LANGUAGE</Typography>
        <List>
          <ListItem sx={{ padding: 0 }}><input type="checkbox" onChange={handleLanguageFilter}
            checked={lang.includes("english")} value={`english`} />English</ListItem>
          <ListItem sx={{ padding: 0 }}><input type="checkbox" onChange={handleLanguageFilter}
            checked={lang.includes("urdu")} value={`urdu`} />Urdu</ListItem>

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
            position: 'relative',
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              overflow: 'hidden',
              position: 'relative',
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
