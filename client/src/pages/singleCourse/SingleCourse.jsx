import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificCourse } from '../../redux/actions/courseActions';
import { getCourselesson } from '../../redux/actions/lessonActions';
import api from '../../utils/common.js'
import { notify } from '../../utils/HelperFunctions';
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

const SingleCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  console.log(id);

  const dispatch = useDispatch()
  const { singleCourse } = useSelector((state) => state.course)
  const { lessons } = useSelector((state) => state.lesson)
  const { user } = useSelector((state) => state.auth)

  const token = localStorage.getItem('token')
  useEffect(() => {
    dispatch(getSpecificCourse(id, token))
    console.log(user);

    // dispatch(getCourselesson(id, token))

  }, [])
  // Course delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Lesson delete modal
  const [lessonDeleteModalOpen, setLessonDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const handleLessonDelete = (lesson) => {
    setLessonToDelete(lesson);
    setLessonDeleteModalOpen(true);
  };

  const handleEnrollNow = async () => {
    try {
      const res = await api.get(`/enroll/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true
      })
      console.log(res);
      notify('success', res.data.message)
    } catch (error) {
      console.log(error);
      notify('error', error.response.data.message)

    }
  }

  const isEnrolled = singleCourse?.enrolledStudents?.find((student) => {
    return student === user._id
  })



  return (
    <>

      <Box  sx={{padding:{md:'20px',xs:'10px'}}}>
        <Box sx={{ bgcolor: '#1a1b2b', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '20px' }}>

          <Typography mb={2} fontWeight={'bold'} fontSize={30} color='#fff'>{singleCourse?.title || 'Title'}</Typography>
          <Typography mb={2} color='#fff' fontSize={18}>{singleCourse?.subTitle || 'subtitle'}</Typography>
          <Box display={'flex'} alignItems={'center'} gap={2} >

            <Typography color='#fff' fontSize={13}>Created By {singleCourse?.teacherId?.username}</Typography>
            <Typography color='#fff' fontSize={13}>Created On {singleCourse?.createdAt?.split("T")[0]} </Typography>
            <Typography color='#fff' fontSize={13} display={'flex'} alignItems={'center'}><LanguageIcon fontSize="small" />{singleCourse?.language}</Typography>
            <Typography color='#fff' fontSize={13}>{singleCourse?.enrolledStudents?.length} {singleCourse?.enrolledStudents?.length > 1 ? 'Students' : 'Student'}</Typography>
          </Box>



        </Box>

        <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'} gap={1} >
          <Box sx={{width:{md:'67%',sm:'55%'}}} marginTop={'20px'}>

            <Box sx={{ border: '1px solid #ddd', width: '100%', borderRadius: '8px', marginBottom: '20px', padding: '20px' }}>
              <Typography fontSize={18} fontWeight={'bold'}>What you'll learn</Typography>
              <Box display={'flex'} flexWrap={'wrap'} gap={2} marginTop={2} >

                <Typography fontSize={15} gap={1} display={'flex'} alignItems={'center'}><CheckCircleOutlineIcon fontSize="small" sx={{ color: "#00cda9" }} />  React Native Full Course 2024</Typography>
                <Typography fontSize={15} gap={1} display={'flex'} alignItems={'center'}><CheckCircleOutlineIcon fontSize="small" sx={{ color: "#00cda9" }} />  React Native Full Course 2024</Typography>
                <Typography fontSize={15} gap={1} display={'flex'} alignItems={'center'}><CheckCircleOutlineIcon fontSize="small" sx={{ color: "#00cda9" }} />  React Native Full Course 2024</Typography>
                <Typography fontSize={15} gap={1} display={'flex'} alignItems={'center'}><CheckCircleOutlineIcon fontSize="small" sx={{ color: "#00cda9" }} />  React Native Full Course 2024</Typography>

              </Box>
            </Box>
            <Box marginBottom={2} sx={{ border: '1px solid #ddd', width: '100%', borderRadius: '8px', padding: '20px' }}>
              <Typography fontSize={18} fontWeight={'bold'} marginBottom={2}>Course Description</Typography>
              <Typography fontSize={15} display={'flex'} alignItems={'center'}>{singleCourse?.description}</Typography>
            </Box>
            <Box marginBottom={2} sx={{ border: '1px solid #ddd', width: '100%', borderRadius: '8px', padding: '20px' }}>
              <Typography fontSize={18} fontWeight={'bold'} marginBottom={2}>Course Curriculum</Typography>
              {singleCourse?.lessons?.map((lesson)=> (

              <Typography key={lesson?._id} fontSize={15} display={'flex'} alignItems={'center'}><PlayCircleOutlinedIcon fontSize="small" />{lesson.title}</Typography>
              ))}

            </Box>

          </Box>

          <Box sx={{  marginTop: '20px', width: {md:'30%',sm:'42%'},    }}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: '8px',padding: {md:'20px',xs:'5px'},}}>


            <Box component={'img'} src={singleCourse?.thumbnail} sx={{ width: '100%', maxHeight: '400px' }} />
            <button style={{ width: '100%', padding: '10px', borderRadius: '10px', backgroundColor: '#1f1f1fdd', color: '#fff' }} onClick={handleEnrollNow}>{isEnrolled?'Continue':'Enroll Now'}</button>
          </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleCourse;
