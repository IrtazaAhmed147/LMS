import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Sidebar from '../../components/sideBar/SideBar';
import CourseCard from '../../components/card/CourseCard';
import DashboardStatsCard from '../../components/card/DashboardStatsCard';
import LessonCard from '../../components/card/LessonCard';

function Home() {
  return (
    <>
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <Box flex={1} bgcolor="#f5f5f5" minHeight="100vh" py={3} px={1}>
        <Container sx={{padding:'10px'}}>
          
          {/* Dashboard Stats */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Dashboard Overview
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
            <DashboardStatsCard />
          </Box>

          {/* Enrolled Courses */}
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Enrolled Courses
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </Box>

          {/* Recent Lessons */}
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Recent Lessons
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
            <LessonCard />
            <LessonCard />
            <LessonCard />
          </Box>

          {/* All Courses */}
          <Typography variant="h6" fontWeight="bold" mb={1}>
            All Courses
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;
