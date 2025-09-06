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

const CourseCard = ({ title, language,subTitle, teacherId, thumbnail, _id, createdAt, category,lessons }) => {

  const { user } = useSelector((state) => state.auth)
  // const isEnrolled = enrolledStudents?.find((student)=> {
  //   return student === user._id
  // })


  //  const isNew = (() => {
  //   if (!createdAt) return false;
  //   const createdTime = new Date(createdAt).getTime();
  //   const now = Date.now();
  //   const diffInHours = (now - createdTime) / (1000 * 60 * 60);
  //   return diffInHours <= 24;
  // })();

  return (

    <>
    <Link to={`/course/detail/${_id}`}>
      <Box sx={{ borderRadius: '8px', height: '150px', width: '100%', border: '1px solid #ddd', overflow: 'hidden', display: 'flex', padding: '10px', marginTop: '10px' }}>
        <Box width={'230px'} height={'100%'}>
          <Box component={'img'} src={thumbnail || `https://sr12121.newzenler.com/images/default-course-thumbnail.png`} width={'100%'} height={'100%'} />
        </Box>
        <Box p={2}>
          <Typography fontWeight={'bold'} color='black' fontSize={16}>{title}</Typography>
          <Typography fontSize={16} color='#6e6e6eff' >Created By <span style={{ fontWeight: 'bold', color: '#181818ff' }}> {teacherId?.username || `username`}</span></Typography>
          <Typography color='#6e6e6eff' fontSize={16}>Language: {language}</Typography>
          <Typography color='#6e6e6eff' fontSize={16}>{lessons?.length} {lessons?.length > 1 ?'Lectures':'Lecture'}</Typography>
        </Box>
      </Box>
    </Link>
    </>
  );
};

export default CourseCard;
