import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificCourse } from '../../redux/actions/courseActions';
import api from '../../utils/common.js'
import { notify } from '../../utils/HelperFunctions';
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import EnrollModal from '../../components/modal/EnrollModal.jsx';

const SingleCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { singleCourse } = useSelector((state) => state.course)
  const { user } = useSelector((state) => state.auth)
  const [modal, setModal] = useState(false)

  const token = localStorage.getItem('token')
  useEffect(() => {
    dispatch(getSpecificCourse(id, token))

  }, [])

  const handleEnrollNow = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/enroll/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true
      })
      setLoading(false)
      notify('success', res.data.message)
      setModal(false)
      navigate(`/lesson/detail/${singleCourse._id}`)
    } catch (error) {
      setLoading(false)
      console.log(error);

      notify('error', error.response.data.message)

    }
  }

  const isEnrolled = singleCourse?.enrolledStudents?.find((student) => {
    return student === user._id
  })



  return (
    <>

      <Box sx={{ padding: { md: '20px', xs: '10px' } }}>
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
          <Box sx={{ width: { md: '67%', sm: '55%' } }} marginTop={'20px'}>

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
              {singleCourse?.lessons?.map((lesson) => (

                <Typography key={lesson?._id} fontSize={15} display={'flex'} alignItems={'center'}><PlayCircleOutlinedIcon fontSize="small" />{lesson.title}</Typography>
              ))}

            </Box>

          </Box>

          <Box sx={{ marginTop: '20px', width: { md: '30%', sm: '42%' }, }}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: { md: '20px', xs: '5px' }, }}>


              <Box component={'img'} src={singleCourse?.thumbnail} sx={{ width: '100%', maxHeight: '400px' }} />
              {isEnrolled &&
                <Link to={`/lesson/detail/${singleCourse._id}`}>
                  <button style={{ width: '100%', padding: '10px', borderRadius: '10px', backgroundColor: '#1f1f1fdd', color: '#fff' }} >Continue</button>
                </Link>
              }
              {!isEnrolled && <button style={{ width: '100%', padding: '10px', borderRadius: '10px', backgroundColor: '#1f1f1fdd', color: '#fff' }} onClick={() => setModal(true)}>Enroll Now</button>}

            </Box>
          </Box>
        </Box>

        {modal && <EnrollModal setModal={setModal} loading={loading} handleEnroll={handleEnrollNow} />}
      </Box>
    </>
  );
};

export default SingleCourse;
