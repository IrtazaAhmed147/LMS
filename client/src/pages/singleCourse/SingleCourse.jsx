import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificCourse } from '../../redux/actions/courseActions';
import { getCourselesson } from '../../redux/actions/lessonActions';



const SingleCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  console.log(id);
  
  const dispatch = useDispatch()
  const { singleCourse } = useSelector((state) => state.course)
  const { lessons } = useSelector((state) => state.lesson)
  const token = localStorage.getItem('token')
  useEffect(() => {
    dispatch(getSpecificCourse(id, token))
    dispatch(getCourselesson(id, token))

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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        pt: 8,
        px: 4,
        bgcolor: '#f5f5f5',
      }}
    >
      {/* 1. Header */}
      <Box display="flex" gap={4} mb={4}>
        <Box>
          <img
            src={singleCourse?.thumbnail || "/course-thumbnail.jpg"}
            alt="course thumbnail"
            style={{
              width: '300px',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {singleCourse?.title}
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Category: {singleCourse?.category || ''}
          </Typography>
          <Typography mt={2} fontWeight="bold">
            Duration: 5 Hours
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Teacher controls */}
      <Box display="flex" gap={2} mb={4}>
        <Link to={`/single/course/edit/${singleCourse?._id}`}>
          <Button variant="contained" color="primary">
            Edit Course
          </Button>
        </Link>
        <Button variant="outlined" color="error" onClick={() => setDeleteModalOpen(true)}>
          Delete Course
        </Button>
        <Link to={`/lesson/create/${singleCourse?._id}`}>
          <Button variant="contained" color="secondary">
            Add Lesson
          </Button>
        </Link>
      </Box>

      {/* Course delete modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this course? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* 2. About Course */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        About This Course
      </Typography>
      <Typography mb={4}>
        {singleCourse?.description}
      </Typography>

      {/* 3. Lessons */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Course Content
      </Typography>
      <List sx={{ mb: 4 }}>
        {lessons?.length !== 0 && lessons?.map((lesson, index) => (
          <ListItem
            key={lesson._id}
            secondaryAction={
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/lesson/edit/${index}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleLessonDelete(lesson._id)}
                >
                  Delete
                </Button>
              </Box>
            }
          >
            <ListItemText primary={`Lesson ${index + 1}: ${lesson.title}`} />
          </ListItem>
        ))}
      </List>

      {/* Lesson delete modal */}
      <Dialog open={lessonDeleteModalOpen} onClose={() => setLessonDeleteModalOpen(false)}>
        <DialogTitle>Confirm Lesson Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{lessonToDelete}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLessonDeleteModalOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* 4. Instructor */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Instructor
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Avatar src="/instructor.jpg" alt="instructor" sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography fontWeight="bold">Sufiyan Ahmed</Typography>
          <Typography color="text.secondary">Senior Web Developer</Typography>
        </Box>
      </Box>

      {/* 5. Enroll CTA */}
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#e3f2fd',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography variant="h6" fontWeight="medium">
          Ready to start this course?
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Enroll Now
        </Button>
      </Paper>

      {/* 6. Reviews */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Reviews
      </Typography>
      <Typography mb={2}>⭐️⭐️⭐️⭐️⭐️ 4.9 (120 reviews)</Typography>


    </Box>
  );
};

export default SingleCourse;
