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
      <Box sx={{borderRadius:'8px',height:'250px',width:'330px',border:'1px solid #ddd',overflow:'hidden'}}>
        <Box width={'100%'} height={'60%'}>
          <Box component={'img'} src={image} width={'100%'} height={'100%'}/>
        </Box>
        <Box p={2}>
               <Typography fontWeight={'bold'}   fontSize={16}>CSS Full Course</Typography>
               <Typography fontWeight={'bold'}   fontSize={16} color='#4d4d4dff'>irtaza ahmed</Typography>
        </Box>
      </Box>
    </>
      );
};

export default CourseCard;
