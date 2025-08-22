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

  const { mode, id } = useParams()

  console.log(mode);
  const dispatch = useDispatch()
  const { singleCourse } = useSelector((state) => state.course)
  const token = localStorage.getItem('token')
  useEffect(() => {

    if (mode === 'edit' && id) {
      dispatch(getSpecificCourse(id, token))
    }
  }, [])

  const courseData = useRef({
    title: singleCourse?.title || '',
    description: singleCourse?.description || '',
    category: singleCourse?.category || '',
    duration: singleCourse?.duration || '',
    thumbnail: null,
  });
  console.log(courseData);

  const [thumbnailPreview, setThumbnailPreview] = useState(singleCourse?.thumbnail || null);
  const categories = ['Web Development', 'Data Science', 'AI/ML', 'Design', 'Marketing'];

  useEffect(() => {
    if (mode === 'edit' && singleCourse?.thumbnail) {
      setThumbnailPreview(singleCourse.thumbnail); // backend URL
    }
  }, [mode, singleCourse]);

  // const (e)=> courseData.current = {...courseData.current, [e.target.name]: e.target.value} = (e) => {
  //   const { name, value } = e.target;
  //   courseData.current = { ...courseData.current, [name]: value }

  // };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setCourseData({ ...courseData, thumbnail: file });
      courseData.current = { ...courseData.current, thumbnail: file }
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData();

    // Append all fields from courseData.current
    for (const key in courseData.current) {
      formData.append(key, courseData.current[key]);
    }

    if (mode === 'create') {


      dispatch(createCourse(formData, token)).then((msg) => {
        notify('success', msg)
      })
    } else if (mode === 'edit') {
      console.log(mode);
      dispatch(updateCourse(formData, token, singleCourse._id)).then((msg) => {
        notify('success', msg)
      })

    }

    // Now you can send formData in an API call
    // axios.post('/api/course', formData, );
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
        px: 1,
        py: 6,
        bgcolor: '#f9f9f9',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: '1000px',
          mx: 'auto',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {mode === 'create' ? 'Create Course' : 'Edit Course'}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Fill the details below to publish your course.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Course Title"
            name="title"
            // value={courseData.current.title}
            onChange={(e) => courseData.current = { ...courseData.current, [e.target.name]: e.target.value }}
            placeholder="e.g., Advanced React for Beginners"
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            // value={courseData.current.description}
            onChange={(e) => courseData.current = { ...courseData.current, [e.target.name]: e.target.value }}
            placeholder="Describe your course..."
            multiline
            rows={5}
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              // value={courseData.current.category}
              onChange={(e) => courseData.current = { ...courseData.current, [e.target.name]: e.target.value }}
              label="Category"
            >
              {categories.map((cat, i) => (
                <MenuItem key={i} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Estimated Duration"
            name="duration"
            // value={courseData.duration}
            onChange={(e) => courseData.current = { ...courseData.current, [e.target.name]: e.target.value }}
            placeholder="e.g., 4 hours"
            fullWidth
            required
          />
          <Box display={'flex'} gap={2}>
            <label style={{ display: 'flex', gap: 5 }}>

              <input value={'Anyone can join'} defaultChecked type='radio' name='join' /> Anyone can join
            </label>
            <label style={{ display: 'flex', gap: 5 }}>

              <input value={'Approval'} type='radio' name='join' /> Approval
            </label>
          </Box>

          <Box>
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderStyle: 'dashed',
                width: '100%',
                py: 2,
                textTransform: 'none',
                fontWeight: 'medium',
              }}
            >
              Upload Thumbnail
              <input type="file" hidden accept="image/*" onChange={handleThumbnailUpload} />
            </Button>
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
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '1px solid #ddd'
                  }}
                />
              </Box>
            )}
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained">
              {mode === 'create' ? 'Create Course' : 'Update Course'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCourse;
