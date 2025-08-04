import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';

const StatCard = ({ icon, count, label }) => {
  return (
    <Card sx={{ minWidth: 200, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box color="primary.main">{icon}</Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">{count}</Typography>
            <Typography color="text.secondary" variant="body2">{label}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardStatsCard = () => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <StatCard icon={<SchoolIcon fontSize="large" />} count={12} label="Total Courses" />
      <StatCard icon={<PeopleIcon fontSize="large" />} count={560} label="Students Enrolled" />
      <StatCard icon={<PersonIcon fontSize="large" />} count={18} label="Instructors" />
      <StatCard icon={<MenuBookIcon fontSize="large" />} count={98} label="Lessons" />
    </Box>
  );
};

export default DashboardStatsCard;
