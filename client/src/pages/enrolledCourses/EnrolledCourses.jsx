import React from 'react';
import { Box, Container, Typography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from '../../components/card/CourseCard';

const EnrolledCourses = () => {
    const categories = ['All', 'Web Development', 'Data Science', 'AI/ML', 'Design', 'Marketing'];

    return (
        <Box
            flex={1}
            bgcolor="#f5f5f5"
            minHeight="100vh"
            py={3}
            px={1}
            sx={{
                width: '100%', // Adjust for sidebar
            }}
        >
            <Container>
                {/* Page Header */}
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    My Enrolled Courses
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Here are all the courses you are currently enrolled in.
                </Typography>

                {/* Search & Filter Row */}
                <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
                    {/* Search Bar */}
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

                    {/* Category Filter */}
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

                {/* Courses Grid */}
                <Box display="flex" flexWrap="wrap" gap={2}>
                    {/* Example static data for now */}
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </Box>
            </Container>
        </Box>
    );
};

export default EnrolledCourses;
