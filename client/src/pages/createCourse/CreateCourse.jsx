import React, { useState, useEffect } from 'react';
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

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    thumbnail: null,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const categories = ['Web Development', 'Data Science', 'AI/ML', 'Design', 'Marketing'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({ ...courseData, thumbnail: file });
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(courseData);
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
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Create Course
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Fill the details below to publish your course.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Course Title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            placeholder="e.g., Advanced React for Beginners"
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            placeholder="Describe your course..."
            multiline
            rows={5}
            fullWidth
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={courseData.category}
              onChange={handleChange}
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
            value={courseData.duration}
            onChange={handleChange}
            placeholder="e.g., 4 hours"
            fullWidth
            required
          />

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
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4 }}>
              Create Course
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCourse;
