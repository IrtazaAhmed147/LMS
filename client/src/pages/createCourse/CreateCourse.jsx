import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Divider,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getSpecificCourse, updateCourse } from '../../redux/actions/courseActions';
import { notify } from '../../utils/HelperFunctions';

const CreateCourse = () => {

  const [mode, setMode] = useState('create')
  const dispatch = useDispatch()
  const { singleCourse, isLoading, error } = useSelector((state) => state.course)
  const token = localStorage.getItem('token')
  const [box, setBox] = useState('landing')
  const [lectureCount, setLectureCount] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {

    if (singleCourse?.title) {

      setMode('edit')
    }
  }, [])

  const categoriesArr = [
    'Web Development',
    'Backend Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'Cyber Security',
    'Mobile Development',
    'Game Development',
    'Software Engineering',
  ]

  const [courseData, setCourseData] = useState({
    title: singleCourse?.title || '',
    description: singleCourse?.description || '',
    category: singleCourse?.category || '',
    language: singleCourse?.language || '',
    subTitle: singleCourse?.subTitle || '',

    thumbnail: singleCourse?.thumbnail || null,
  });

  const [lectureData, setLectureData] = useState([
    { title: 'lecture 1' }
  ])


  const [thumbnailPreview, setThumbnailPreview] = useState(singleCourse?.thumbnail || null);



  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setCourseData({ ...courseData, thumbnail: file });
      courseData.thumbnail = file
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData();
    if (!courseData.title.trim() || !courseData.description.trim() || !courseData.category.trim() || !courseData.language.trim() || !courseData.thumbnail || !courseData.subTitle.trim()) return notify('error', 'missing fields')

    // // Append all fields from courseData.current
    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }
    if (mode === 'create') {


      dispatch(createCourse(formData, token)).then((msg) => {
        notify('success', msg)
        navigate('/instructor')
      }).catch((msg) => console.log(msg))
    } else if (mode === 'edit') {
      console.log(mode);
      console.log(singleCourse?._id);
      console.log([...formData]);

      dispatch(updateCourse(formData, token, singleCourse._id)).then((msg) => {
        notify('success', msg)
        navigate('/instructor')
      })

    }

  };

  

  useEffect(() => {
    // Cleanup preview URL to avoid memory leaks
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // width: 'calc(100vw - 265px)',
        px: {md:1,xs:0.5},
        py: 2,
        bgcolor: '#f9f9f9',
        overflowY: 'auto',
      }}
    >

      <Box sx={{ width: '98%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontWeight={'bold'} sx={{ fontSize: { sm: 30, xs: 15 } }} >{mode === 'edit' ? "Update Course" : 'Create a new course'}</Typography>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          style={{
            backgroundColor: 'rgb(45 45 45)', display: 'flex', gap: '5px',
            borderRadius: '8px', border: 'none', color: 'white',
            padding: '10px 20px'
          }}
        >
          {isLoading && <CircularProgress size={15} color='white' />} Submit
        </button>
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


          <Box onClick={() => setBox('landing')} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'landing' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '4px' } }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 12 } }} >Course Landing Page</Typography>
          </Box>

          <Box onClick={() => setBox('settings')} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'settings' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '4px' } }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 12 } }} >Settings</Typography>
          </Box>

        </Box>



        {box === 'landing' && <Box my={3} sx={{ padding: '10px 10px', backgroundColor: '#fff', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px', width: '100%' }}>

          <Typography mb={3} fontWeight={'bold'} fontSize={18}>{mode === 'edit' ? 'Update' : 'Create'} Landing Page</Typography>
          <form>

            <Typography fontWeight={'bold'} mt={2} fontSize={16}>Title</Typography>
            <input
              name='title'
              value={courseData.title}
              onChange={handleChange}
              style={{ height: '40px', width: '100%', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ddd' }} type="text" placeholder='enter a course title' />

            <Typography fontWeight={'bold'} mt={2} fontSize={16}>Category</Typography>
            <Select
              name='category'
              onChange={handleChange}
              value={courseData.category}
              defaultValue="Category"

              style={{ width: '100%', height: '40px', outline: 'none', border: '1px solid #dddd', borderRadius: '8px' }}>
              <MenuItem value={'Category'} disabled={true}>{'Category'}</MenuItem >
              {categoriesArr?.map((category, i) => (
                <MenuItem key={i} value={category.toLowerCase()} >{category}</MenuItem >
              ))}
            </Select >

            <Typography fontWeight={'bold'} mt={2} fontSize={16}>Primary Language</Typography>
            <Select
              name='language'
              value={courseData.language}
              onChange={handleChange}

              defaultValue="Primary Language"
              style={{ width: '100%', height: '40px', outline: 'none', border: '1px solid #dddd', borderRadius: '8px' }}>
              <MenuItem value="Primary Language" disabled={true}>Primary Language</MenuItem >
              <MenuItem value="english" >English</MenuItem >
              <MenuItem value="urdu" >Urdu</MenuItem >
            </Select >
            <Typography fontWeight={'bold'} mt={2} fontSize={16}>Subtitle</Typography>
            <input
              value={courseData.subTitle}
              onChange={handleChange}
              name='subTitle' style={{ height: '40px', width: '100%', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ddd' }} type="text" placeholder='enter a course subtitle' />

            <Typography fontWeight={'bold'} mt={2} fontSize={16}>Description</Typography>
            < input
              value={courseData.description}
              onChange={handleChange}
              name='description' style={{ height: '40px', width: '100%', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ddd' }} type="text" placeholder='enter a course description' />

          </form>
        </Box>}

        {box === 'settings' && <Box my={3} sx={{ padding: '10px 10px', backgroundColor: '#fff', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px', width: '100%' }}>

          <Typography mb={3} fontWeight={'bold'} fontSize={18}>Course Settings</Typography>


          {courseData.thumbnail && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }} color="text.secondary">
              Selected: {courseData.thumbnail.name}
            </Typography>
          )}
          {thumbnailPreview && (
            <Box mt={2}>
              <Typography variant="subtitle2" mb={1}>
                Thumbnail Preview:
              </Typography>
              <Box
                component="img"
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                sx={{
                  maxWidth: '100%',
                  objectFit: 'cover',
                  borderRadius: 2,
                  border: '1px solid #ddd'
                }}
              />
            </Box>
          )}

          <Typography fontWeight={'bold'} mt={2} fontSize={16}>Upload Course Image</Typography>
          <input accept="image/*" onChange={handleThumbnailUpload} style={{ padding: '0px', height: 'auto', cursor: 'pointer' }} type="file" />
        </Box>}



      </Box>
    </Box>
  );
};

export default CreateCourse;
