import React, { useEffect } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import Sidebar from '../../components/sideBar/SideBar';
import CourseCard from '../../components/card/CourseCard';
import DashboardStatsCard from '../../components/card/DashboardStatsCard';
import LessonCard from '../../components/card/LessonCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/actions/dashboardActions';
import { getEnrolledCourses } from '../../redux/actions/courseActions';

function Home() {

  const token = localStorage.getItem('token')
  const { user } = useSelector((state) => state.auth)
  const { enrolledCourses, isLoading, error } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user.role === 'student') {

      dispatch(getEnrolledCourses(token, user._id))
    }
  }, [])

  return (
    <>

      {/* Main Content */}
      <Box flex={1} bgcolor="#f5f5f5" minHeight="100vh" py={3} px={1}>
        <Container sx={{ padding: '10px' }}>

          {/* Dashboard Stats */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Dashboard Overview
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
            <DashboardStatsCard />
          </Box>

          {/* Enrolled Courses */}
          {user.role === 'student' && (<>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Enrolled Courses
            </Typography>
            <Box display="flex" alignItems={'center'} gap={2} minHeight={340} flexWrap="wrap" mb={4}>
              {isLoading ?  <CircularProgress sx={{margin: 'auto'}} />: enrolledCourses.slice(0,4)?.map((value) => (

                <CourseCard  {...value} key={value._id} />
              ))}
            </Box>
          </>)}

          {/* Recent Lessons */}
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Recent Lessons
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
            <LessonCard />
            <LessonCard />
            <LessonCard />
          </Box>

         
        </Container>
      </Box>
    </>
  );
}

export default Home;
