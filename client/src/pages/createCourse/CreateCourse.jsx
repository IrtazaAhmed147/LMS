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
  Divider
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getSpecificCourse, updateCourse } from '../../redux/actions/courseActions';
import { notify } from '../../utils/HelperFunctions';

const CreateCourse = () => {

  // const { mode, id } = useParams()
  const mode = 'create'
  // console.log(mode);
  const dispatch = useDispatch()
  const { singleCourse, isLoading, error } = useSelector((state) => state.course)
  const token = localStorage.getItem('token')
  const [box, setBox] = useState('curriculum')
  const [lectureCount, setLectureCount] = useState(1)
  // useEffect(() => {

  //   if (mode === 'edit' && id) {
  //     dispatch(getSpecificCourse(id, token))
  //   }
  // }, [])

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

  useEffect(() => {
    // if (mode === 'edit' && singleCourse?.thumbnail) {
    //   setThumbnailPreview(singleCourse.thumbnail); // backend URL
    // }
  }, [mode, singleCourse]);

  // const (e)=> courseData.current = {...courseData.current, [e.target.name]: e.target.value} = (e) => {
  //   const { name, value } = e.target;
  //   courseData.current = { ...courseData.current, [name]: value }

  // };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setCourseData({ ...courseData, thumbnail: file });
      courseData.thumbnail = file
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };
  const handleLectureThumbnail = (e,i) => {
    setLectureData((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, thumbnail: e.target.files[0] } : item
      )
    )
    console.log(lectureData);
    
    // const file = e.target.files[0];
    // if (file) {
    //   // setCourseData({ ...courseData, thumbnail: file });
    //   lectureData.thumbnail = file
    //   setThumbnailPreview(URL.createObjectURL(file));
    // }
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


    console.log(courseData);
    console.log(lectureData);
// return
    const formData = new FormData();
    if (!courseData.title.trim() || !courseData.description.trim() || !courseData.category.trim() || !courseData.language.trim() || !courseData.thumbnail || !courseData.subTitle.trim()) return notify('error', 'missing fields')

    // // Append all fields from courseData.current
    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }
    // if (mode === 'create') {


    dispatch(createCourse(formData, token)).then((msg) => {
      notify('success', msg)
    }).catch((msg) => console.log(msg))
    // } else if (mode === 'edit') {
    //   console.log(mode);
    //   dispatch(updateCourse(formData, token, singleCourse._id)).then((msg) => {
    //     notify('success', msg)
    //   })

    // }

    // Now you can send formData in an API call
    // axios.post('/api/course', formData, );
  };

  const handleAddLecture = () => {
    setLectureCount(prev => prev + 1)
    setLectureData((prev) => [
      ...prev,
      { title: `Lecture ${prev.length + 1}` }
    ])

  }

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
        px: 1,
        py: 2,
        bgcolor: '#f9f9f9',
        overflowY: 'auto',
      }}
    >

      <Box sx={{ width: '98%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontWeight={'bold'} sx={{ fontSize: { sm: 30, xs: 20 } }} >Create a new course</Typography>
        <button onClick={handleSubmit} style={{
          backgroundColor: 'rgb(45 45 45)', borderRadius: '8px', border: 'none', color: 'white', padding: '10px 20px', width: 'auto', margin: '0'
        }}>Submit</button>
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

          <Box onClick={() => setBox('curriculum')} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'curriculum' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '4px' } }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 13 } }} >Curriculum</Typography>
          </Box>

          <Box onClick={() => setBox('landing')} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'landing' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '4px' } }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 13 } }} >Course Landing Page</Typography>
          </Box>

          <Box onClick={() => setBox('settings')} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'settings' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '4px' } }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 13 } }} >Settings</Typography>
          </Box>

        </Box>


        {box === 'curriculum' && <Box my={3} sx={{ padding: '10px 10px', backgroundColor: '#fff', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px', width: '100%' }}>


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
                accept="image/*" onChange={(e)=> handleLectureThumbnail(e,i)}
              />
            </Box>
          ))}


        </Box>}

        {box === 'landing' && <Box my={3} sx={{ padding: '10px 10px', backgroundColor: '#fff', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px', width: '100%' }}>

          <Typography mb={3} fontWeight={'bold'} fontSize={18}>Create Landing Page</Typography>
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
              // defaultValue="Category" 
              displayEmpty
              style={{ width: '100%', height: '40px', outline: 'none', border: '1px solid #dddd', borderRadius: '8px' }}>
              <MenuItem value={'Category'} disabled={true}>{'Category'}</MenuItem >
              {categoriesArr?.map((category, i) => (
                <MenuItem key={i} value={category} >{category}</MenuItem >
              ))}
            </Select >

            <Typography fontWeight={'bold'} mt={2} fontSize={16}>Primary Language</Typography>
            <Select
              name='language'
              value={courseData.language}
              onChange={handleChange}
              displayEmpty
              // defaultValue="Primary Language" 
              style={{ width: '100%', height: '40px', outline: 'none', border: '1px solid #dddd', borderRadius: '8px' }}>
              <MenuItem value="Primary Language" disabled={true}>Primary Language</MenuItem >
              <MenuItem value="English" >English</MenuItem >
              <MenuItem value="Urdu" >Urdu</MenuItem >
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
