import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import StatCard from './StatCard';
import { useSelector } from 'react-redux';


const DashboardStatsCard = () => {

  const { stats } = useSelector((state) => state.dashboard)

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <StatCard icon={<SchoolIcon fontSize="large" />} count={stats?.totalCourses || '0'} label="Total Courses" />
      <StatCard icon={<PeopleIcon fontSize="large" />} count={stats?.totalStudents || '0'} label="Students" />
      <StatCard icon={<PersonIcon fontSize="large" />} count={stats?.totalInstructors || '0'} label="Instructors" />
      <StatCard icon={<MenuBookIcon fontSize="large" />} count={stats?.totalLessons || '0'} label="Lessons" />
    </Box>
  );
};

export default DashboardStatsCard;
