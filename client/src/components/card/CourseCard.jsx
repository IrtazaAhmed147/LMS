import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';

const CourseCard = () => {
  return (
    <Card sx={{ width: 250, borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image="/images/excel-course.png" // Change to your actual image path
          alt="Excel Crash Course"
        />
        <Chip
          label="New"
          color="primary"
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        />
      </Box>
      <CardContent sx={{ background: 'linear-gradient(to top, #003049, #0077b6)', color: 'white' }}>
        <Typography variant="body2" fontWeight="bold">
          MERN Stack development full crash course: <br />
          best course in 2025   
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
