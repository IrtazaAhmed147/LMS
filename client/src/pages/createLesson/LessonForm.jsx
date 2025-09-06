import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, Divider,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createLesson, getCourselesson } from '../../redux/actions/lessonActions';
import { notify } from '../../utils/HelperFunctions';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';



const LessonForm = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [lectureCount, setLectureCount] = useState(1)
  const { lessons, isLoading, error } = useSelector((state) => state.lesson)

  const [box, setBox] = useState('create lecture')


  const [lectureData, setLectureData] = useState([
    { title: 'lecture 1' }
  ])

  useEffect(() => {
    // if (box === 'allLectures') {

      dispatch(getCourselesson(courseId, token))
      console.log(lessons);

    // }
  }, [])

  const handleAddLecture = () => {
    setLectureCount(prev => prev + 1)
    setLectureData((prev) => [
      ...prev,
      { title: `Lecture ${prev.length + 1}` }
    ])

  }
  const handleLectureContent = (e, i) => {
    setLectureData((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, content: e.target.files[0] } : item
      )
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingField = lectureData.map((lecture) => {

      if (!lecture?.title.trim() || !lecture?.content) {
        return true

      } else { return false }
    })

    if (missingField[0]) return notify('error', 'missingField')
    const formData = new FormData();

    formData.append("courseId", courseId);

    lectureData.forEach((lesson, index) => {
      formData.append(`titles[${index}]`, lesson.title);
      formData.append("files", lesson.content);
    });

    dispatch(createLesson(formData, token)).then((msg) =>
      notify('success', msg)
    ).catch((err) => notify('error', err))
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        // width: 'calc(100vw - 265px)',
        px: 1,
        py: 2,
        bgcolor: '#f9f9f9',
        overflowY: 'auto',
      }}
    >

      <Box sx={{ width: '98%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontWeight={'bold'} sx={{ fontSize: { sm: 30, xs: 20 } }} >Create new Lectures</Typography>
        <button disabled={isLoading ? true : false} onClick={handleSubmit} style={{
          backgroundColor: 'rgb(45 45 45)', display: 'flex', gap: '5px', borderRadius: '8px', border: 'none', color: 'white', padding: '10px 20px', width: 'auto', margin: '0'
        }}>{isLoading && <CircularProgress size={15} color='white' />} Submit</button>
      </Box>


      <Box
        mt={3}
        sx={{
          width: '98%',
          mx: 'auto',
          p: { sm: 4, xs: 1 },
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #ddd'
        }}
      >

        <Box sx={{ padding: '4px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#f9f9f9', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px', overflow: 'hidden', height: { sm: '30px', xs: '60px' }, width: { sm: '500px' }, marginBottom: '15px' }}>

          <Box onClick={() => setBox('create lecture')} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'create lecture' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '4px' } }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 13 } }} >create lecture</Typography>
          </Box>

          <Box onClick={() => setBox('allLectures')} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'allLectures' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '4px' } }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 13 } }} >All Lectures</Typography>
          </Box>


        </Box>



        {box === 'create lecture' && <Box my={3} sx={{ padding: '10px 10px', backgroundColor: '#fff', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px', width: '100%' }}>


          <Typography mb={3} fontWeight={'bold'} fontSize={18}>Create Course Curriculum</Typography>

          <button onClick={handleAddLecture} style={{
            backgroundColor: '#6b6b6bdd', borderRadius: '8px', border: 'none', color: 'white', padding: '10px 20px', width: 'auto'
          }}>Add Lecture</button>
          {Array.from({ length: lectureCount }).map((_, i) => (
            <Box
              key={i}
              my={3}
              sx={{
                padding: '10px 10px',
                backgroundColor: '#fff',
                border: '1px solid #dddd',
                borderRadius: '8px',
                width: '100%',
              }}
            >
              <Box
                mb={2}
                sx={{ display: { sm: 'flex', xs: 'block' }, alignItems: 'center', gap: 2 }}
              >
                <Typography fontWeight={'bold'} fontSize={16}>
                  Lecture {i + 1}
                </Typography>
                <Box
                  onChange={(e) =>
                    setLectureData((prev) =>
                      prev.map((item, index) =>
                        index === i ? { ...item, title: e.target.value } : item
                      )
                    )
                  }
                  value={lectureData[i]?.title}
                  name={`title${i + 1}`}
                  component={'input'}
                  sx={{ width: { sm: '300px', xs: '100%' }, height: '30px', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ddd' }}
                  type="text"
                  placeholder="Enter a lecture title"
                />
              </Box>

              <Box
                component={'input'}
                sx={{ width: { sm: '385px', xs: '100%' }, height: 'auto', padding: '0px' }}
                type="file"
                accept="image/*" onChange={(e) => handleLectureContent(e, i)}
              />
            </Box>
          ))}


        </Box>}

        {box === 'allLectures' &&
          <Box >

            {lessons?.map((lesson) => (

              <Box sx={{ marginTop: '10px', width: '100%', padding: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                <Box>{lesson?.title}</Box>
                <Box>
                  <BorderColorOutlinedIcon />
                  <span >
                    <BackspaceOutlinedIcon />
                  </span>
                </Box>
              </Box>
            ))}


          </Box>


        }






      </Box>
    </Box>
  );
};

export default LessonForm;
