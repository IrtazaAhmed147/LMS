import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, MenuItem, InputLabel,
  FormControl, Select, Divider
} from '@mui/material';

const LessonForm = () => {
  const { lessonId } = useParams(); // undefined if create mode
  const isEdit = Boolean(lessonId);
  console.log(lessonId);
  
  const [lessonData, setLessonData] = useState({
    title: '',
    contentType: '',
    contentUrl: '',
    duration: '',
  });

  const contentTypes = ['video', 'pdf', 'article'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      console.log('Updating lesson:', lessonData);
      // Call API for update
    } else {
      console.log('Creating lesson:', lessonData);
      // Call API for create
    }
  };

  useEffect(() => {
    if (isEdit) {
      // Fetch existing lesson data here
      // Example:
      // fetch(`/api/lessons/${lessonId}`).then(res => res.json()).then(data => setLessonData(data));
      setLessonData({
        title: 'State and Props',
        contentType: 'video',
        contentUrl: 'https://youtube.com/example',
        duration: '12 mins'
      });
    }
  }, [isEdit, lessonId]);

  return (
    <Box sx={{ minHeight: '100vh', px: 2, py: 6, bgcolor: '#f9f9f9', overflowY: 'auto' }}>
      <Box sx={{ maxWidth: '800px', mx: 'auto', p: 4, backgroundColor: 'white', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          {isEdit ? 'Edit Lesson' : 'Create Lesson'}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {isEdit ? 'Update the lesson details below.' : 'Fill in the lesson details below.'}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Lesson Title"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            placeholder="e.g., Introduction to React"
            fullWidth
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Content Type</InputLabel>
            <Select
              name="contentType"
              value={lessonData.contentType}
              onChange={handleChange}
            >
              {contentTypes.map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Content URL"
            name="contentUrl"
            value={lessonData.contentUrl}
            onChange={handleChange}
            placeholder="Paste the video/PDF/article link here"
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
