import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, Divider
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createLesson } from '../../redux/actions/lessonActions';
import { notify } from '../../utils/HelperFunctions';

const LessonForm = () => {
  const { lessonId, courseId } = useParams();
  const isEdit = Boolean(lessonId);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const [lessonData, setLessonData] = useState({
    title: '',
    duration: '',
    contentType: 'image',
    contentUrl: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
  };

  const handleImageChange = (e) => {
    setLessonData({ ...lessonData, contentUrl: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', lessonData.title);
    formData.append('duration', lessonData.duration);
    formData.append('courseId', courseId);
    formData.append('contentType', 'image');

    lessonData.contentUrl.forEach((img, i) => {
      formData.append('contentUrl', img); // or `contentUrl[]` depending on backend
    });
    console.log(lessonData);
    

    if (isEdit) {
      // update logic
    } else {
      dispatch(createLesson(formData, token)).then((msg) =>
        notify('success', msg)
      ).catch((err)=> notify('error', err))
    }
  };

  useEffect(() => {
    if (isEdit) {
      // Set existing data here if editing
      setLessonData({
        title: 'Sample Lesson',
        duration: '10 mins',
        contentType: 'image',
        contentUrl: [], // preload if needed
      });
    }
  }, [isEdit]);

  return (
    <Box sx={{ minHeight: '100vh', px: 2, py: 6, bgcolor: '#f9f9f9' }}>
      <Box sx={{ maxWidth: '800px', mx: 'auto', p: 4, backgroundColor: 'white', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          {isEdit ? 'Edit Lesson' : 'Create Lesson'}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Upload contentUrl related to your lesson.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Lesson Title"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            placeholder="e.g., JavaScript Basics"
            fullWidth
            required
          />

          <TextField
            label="Duration"
            name="duration"
            value={lessonData.duration}
            onChange={handleChange}
            placeholder="e.g., 15 mins"
            fullWidth
            required
          />

          <Button variant="outlined" component="label">
            Upload contentUrl
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {lessonData.contentUrl.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                {lessonData.contentUrl.length} image(s) selected
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                {lessonData.contentUrl.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4 }}>
              {isEdit ? 'Update Lesson' : 'Create Lesson'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LessonForm;
