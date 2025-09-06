import React, { useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Button } from '@mui/material';
import Sidebar from '../../components/sideBar/SideBar';
import CourseCard from '../../components/card/CourseCard';
import DashboardStatsCard from '../../components/card/DashboardStatsCard';
import LessonCard from '../../components/card/LessonCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/actions/dashboardActions';
import { getEnrolledCourses } from '../../redux/actions/courseActions';
import banner from '../../assets/lms banner.png'
import FeatureCard from '../../components/card/FeatureCard';
import { useNavigate } from 'react-router-dom';

function Home() {

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

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

  return (
    <>

      {/* Main Content */}
      <Box minHeight="100vh" py={3} >

        <Box width={'100%'} sx={{ display: { sm: 'flex', xs: 'block' } }} justifyContent={'space-between'} alignItems={'center'} bgcolor="#fff" >

          <Box sx={{ width: { sm: '30%', xs: '98%' }, px: '10px' }}>
            <Typography fontWeight={'bold'} variant='h4'>Learning that gets you</Typography>
            <Typography color='#2e2e2eff'>Skills for your present and your future. Get Started with us</Typography>
          </Box>
          <Box sx={{ width: { sm: '65%', xs: '98%' }, p: '30px' }}>
            <Box boxShadow={'0px 0px 5px 2px #ebebeb'} width={'100%'} component={'img'} src={banner} />
          </Box>

        </Box>

        <Box sx={{ padding: '20px' }} bgcolor={'#f1f1f1'}>
          <Typography fontWeight={'bold'} mb={2} variant='h4'>Course Categories</Typography>
          <Box width={'100%'} display={'flex'} flexWrap={'wrap'} gap={2} >
            {categoriesArr.map((category, i) => (
              <Button key={i} sx={{ borderRadius: 2, fontSize: '13px', fontWeight: 'bold', display: 'block', width: '310px', textAlign: 'start', border: '1px solid #ddd', color: 'black', transition: '0.6s all ease-in-out', backgroundColor: '#fff', '&:hover': { backgroundColor: '#cdcdcd' } }}>{category}</Button>
            ))}
          </Box>
        </Box>

        <Box sx={{ padding: '20px' }}>
          <Typography fontWeight={'bold'}  mb={2} variant='h4'>Featured Courses</Typography>
              <Box width={'100%'} display={'flex'} flexWrap={'wrap'} gap={2} >

            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
              </Box>
        </Box>

      </Box>
    </>
  );
}

export default Home;
