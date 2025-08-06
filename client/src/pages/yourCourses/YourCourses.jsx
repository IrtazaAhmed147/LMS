import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import CourseCard from '../../components/card/CourseCard';

const YourCourses = () => {
  const categories = ['All', 'Web Development', 'Data Science', 'AI/ML', 'Design', 'Marketing'];

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting course:', courseToDelete);
    // API call to delete course
    setOpenDeleteModal(false);
    setCourseToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setCourseToDelete(null);
  };

  return (
    <Box
      flex={1}
      bgcolor="#f5f5f5"
      minHeight="100vh"
      py={3}
      px={1}
      sx={{
        width: '100%',
      }}
    >
      <Container>
        {/* Page Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Your Courses
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => console.log('Create New Course')}
          >
            Create New Course
          </Button>
        </Box>

        {/* Search & Filter */}
        <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
          <TextField
            placeholder="Search courses..."
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: '250px', bgcolor: 'white' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 180, bgcolor: 'white' }}>
            <InputLabel>Category</InputLabel>
            <Select defaultValue="All" label="Category">
              {categories.map((cat, i) => (
                <MenuItem key={i} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Courses List */}
        <Box display="flex" flexWrap="wrap" gap={2}>
          {[1, 2, 3, 4].map((id) => (
            <Box key={id} position="relative">
              <CourseCard />
            </Box>
          ))}
        </Box>
      </Container>

      
    </Box>
  );
};

export default YourCourses;
