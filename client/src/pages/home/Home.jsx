import React, { useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Button } from '@mui/material';
import Sidebar from '../../components/sideBar/SideBar';
import CourseCard from '../../components/card/CourseCard';
import DashboardStatsCard from '../../components/card/DashboardStatsCard';
import LessonCard from '../../components/card/LessonCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/actions/dashboardActions';
import { getAllCourse, getEnrolledCourses } from '../../redux/actions/courseActions';
import banner from '../../assets/lms banner.png'
import FeatureCard from '../../components/card/FeatureCard';
import { Link, useNavigate } from 'react-router-dom';
import { updateCategories } from '../../redux/slices/courseSlice';

function Home() {


  const dispatch = useDispatch()
  const { course, isLoading, error } = useSelector(
    (state) => state.course
  );

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

  useEffect(() => {

    // if (queryCategory) query.category = [queryCategory];


    dispatch(getAllCourse({ limit: 8 }));
  }, []);


  return (
    <>

      {/* Main Content */}
      <Box minHeight="100vh" py={3} >

        <Box width={'100%'} sx={{ display: { sm: 'flex', xs: 'block' } }} justifyContent={'space-between'} alignItems={'center'} bgcolor="#fff" >

          <Box sx={{ width: { sm: '30%', xs: '98%' }, px: '10px' }}>
            <Typography mb={1} fontWeight={'bold'} sx={{ lineHeight: 1, fontSize: { md: '40px', xs: '20px', sm: '20px' } }}>Learning that gets you</Typography>
            <Typography sx={{ lineHeight: 1 }} color='#2e2e2eff'>Skills for your present and your future. Get Started with us</Typography>
          </Box>
          <Box sx={{ width: { sm: '65%', xs: '98%' }, p: '30px' }}>
            <Box boxShadow={'0px 0px 5px 2px #ebebeb'} width={'100%'} component={'img'} src={banner} />
          </Box>

        </Box>

        <Box sx={{ padding: { md: '20px', xs: '10px' } }} bgcolor={'#f1f1f1'}>
          <Typography fontWeight={'bold'} mb={2} sx={{ fontSize: { md: '40px', xs: '20px', sm: '30px' } }}>Course Categories</Typography>
          <Box width={'100%'} display={'flex'} flexWrap={'wrap'} gap={2} >
            {categoriesArr.map((category, i) => (
              <Button key={i} onClick={() => dispatch(updateCategories([category]))} sx={{ margin: { sm: 'auto', md: 'initial', xs: 'auto' }, borderRadius: 2, fontSize: '13px', fontWeight: 'bold', display: 'flex', width: '310px', textAlign: 'start', border: '1px solid #ddd', color: 'black', transition: '0.6s all ease-in-out', backgroundColor: '#fff', '&:hover': { backgroundColor: '#cdcdcd' } }}>
                <Link to={`/courses`} style={{ color: 'black', width: '100%' }}>
                  {category}
                </Link>
              </Button>
            ))}
          </Box>
        </Box>

        <Box sx={{ padding: '20px' }}>
          <Typography fontWeight={'bold'} mb={2} variant='h4'>Featured Courses</Typography>
          <Box width={'100%'} display={'flex'} flexWrap={'wrap'} gap={2} >

            {isLoading ?
              <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '30vh'
              }}>

                <CircularProgress color='inherit' />
              </Box> : error ? (
                <Typography color="error">{error}</Typography>
              ) :
                course?.map((value) => (

                  <FeatureCard  {...value} key={value._id} />
                ))}

          </Box>
        </Box>

      </Box>
    </>
  );
}

export default Home;
