import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Stack,
} from '@mui/material';
import image from '../../assets/mern course.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CourseCard = ({title, description, teacherId, thumbnail, _id, createdAt,category, enrolledStudents}) => {

  const {user} = useSelector((state)=> state.auth)
  const isEnrolled = enrolledStudents?.find((student)=> {
    return student === user._id
  })
  

   const isNew = (() => {
    if (!createdAt) return false;
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    const diffInHours = (now - createdTime) / (1000 * 60 * 60);
    return diffInHours <= 24;
  })();

  return (
    <Card
      sx={{
        width: 270,
        height: 360,
        borderRadius: 3,
        boxShadow: 4,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image with badge */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={thumbnail || image}
          alt="Course Thumbnail"
        />
         {isNew && (
          <Chip
            label="New"
            color="secondary"
            size="small"
            sx={{ position: 'absolute', top: 10, right: 10 }}
          />
        )}
      </Box>

      {/* Course Details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={1}>
            {description}
          </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
            category: {category || ''}
          </Typography>

        {/* Instructor Info */}
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Avatar
            sx={{ width: 28, height: 28 }}
            src="https://i.pravatar.cc/100?img=3"
            alt="Instructor"
          />
          <Typography variant="body2">By {teacherId?.username || 'user'}</Typography>
        </Stack>

      </CardContent>

      {/* Gradient Footer */}
          <Link to={`/course/${_id}`}>
      <Box
        sx={{
          px: 2,
          py: 1,
          background: 'linear-gradient(to right, #0077b6, #00b4d8)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" fontWeight="bold">
      
          {isEnrolled ? "Continue" :"Enroll Now"}
        </Typography>
      </Box>
          </Link>
    </Card>
  );
};

export default CourseCard;
