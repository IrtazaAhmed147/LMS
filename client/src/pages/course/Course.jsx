import React, { useEffect, useRef, useState } from 'react';
import './course.css';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourse } from '../../redux/actions/courseActions';
import CourseSideBar from '../../components/sideBar/CoursesSideBar';
import CourseCard from '../../components/card/CourseCard';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 300;
function Course() {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const { course, isLoading, error, language, categories } = useSelector(
    (state) => state.course
  );
  console.log(error, '==>> error');
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [sortBy, setSortBy] = useState('Sort By');
  const searchValue = useRef('');
  useEffect(() => {
    const query = {};
    if (categories.length) {
      query.category = categories
    };
    if (language.length) query.language = language;
    if (sortBy && sortBy !== 'Sort By') query.sortBy = sortBy;


    dispatch(getAllCourse(query));
  }, [categories, language, sortBy, dispatch]);

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <Box display={'flex'}>
      <CourseSideBar drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile} />
      <Box sx={{width:'100%' , padding: { md: 2, sm: 1, xs: 0.5 } }}>
        <Box
          display={'flex'}
          gap={1}
          justifyContent={'end'}
          alignItems={'center'}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' }, padding: '10px', borderRadius: '10px', cursor: 'pointer', border: '1px solid #ddd' }} onClick={handleDrawerToggle}>
            <MenuIcon />
            <Typography fontWeight={'bold'}>
              Filters
            </Typography>
          </Box>
          <Select
            name="sort"
            onChange={handleChange}
            value={sortBy}
            sx={{
              height: '46px',
              minWidth: { xs: "70px", sm: "100px", md: "120px" }, // responsive width
              fontSize: { xs: "12px", sm: "14px", md: "16px" },    // responsive font size
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              "& .MuiSelect-icon": {
                fontSize: { xs: "16px", sm: "18px" }, // arrow size responsive
              }
            }}
          >
            <MenuItem value={'Sort By'} disabled>
              Sort By
            </MenuItem>
            <MenuItem value={'Newest'}>Newest</MenuItem>
          </Select>
          <Typography fontWeight={'bold'}>
            {course?.length || `0`} results
          </Typography>
        </Box>


        {isLoading ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh'
          }}>

            <CircularProgress color='inherit' />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box>

            {course?.map((item) => <CourseCard {...item} key={item._id} />)}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Course;
