import React from 'react';
import './course.css';
import {
  Box,
  Container,
  Typography,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from '../../components/card/CourseCard';

function Course() {
  return (
    <Box flex={1} bgcolor="#f5f5f5" minHeight="100vh" py={4} px={1}>
      <Container sx={{padding: '10px !important'}}>
        {/* Heading and Filters */}
        <Box display="flex" flexDirection="column" gap={3} mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Explore Courses
          </Typography>

          {/* Search + Filters */}
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
            {/* Search Bar */}
            <Box
              display="flex"
              alignItems="center"
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                px: 2,
                py: 0.5,
                bgcolor: 'white',
                width: { xs: '100%', sm: '300px' },
              }}
            >
              <InputBase
                placeholder="Search courses..."
                fullWidth
                sx={{ fontSize: 14 }}
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select label="Category" defaultValue="">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Web Development">Web Development</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
              </Select>
            </FormControl>

            {/* Sort Filter */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort by</InputLabel>
              <Select label="Sort by" defaultValue="">
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Course Cards */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          {/* Add more cards dynamically */}
        </Box>
      </Container>
    </Box>
  );
}

export default Course;
