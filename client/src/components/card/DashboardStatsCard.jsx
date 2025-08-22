import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import StatCard from './StatCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/actions/dashboardActions';


const DashboardStatsCard = () => {

  const {stats} = useSelector((state)=> state.dashboard)
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getDashboardStats())
  },[])

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <StatCard icon={<SchoolIcon fontSize="large" />} count={stats?.totalCourses} label="Total Courses" />
      <StatCard icon={<PeopleIcon fontSize="large" />} count={stats?.totalStudents} label="Students" />
      <StatCard icon={<PersonIcon fontSize="large" />} count={stats?.totalInstructors} label="Instructors" />
      <StatCard icon={<MenuBookIcon fontSize="large" />} count={stats?.totalLessons} label="Lessons" />
    </Box>
  );
};

export default DashboardStatsCard;
