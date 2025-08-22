import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from '../../components/card/CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from '../../redux/actions/courseActions';
import { useParams } from 'react-router-dom';

const EnrolledCourses = () => {
    const categories = ['All', 'Web Development', 'Data Science', 'AI/ML', 'Design', 'Marketing'];
    const dispatch = useDispatch()
    const { id } = useParams()

    const token = localStorage.getItem('token')
    const { enrolledCourses, isLoading, error } = useSelector((state) => state.course)
    const searchValue = useRef('')
    useEffect(() => {
        dispatch(getEnrolledCourses(token, id))
        console.log(enrolledCourses);

    }, [])

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
                <Box display="flex"  minHeight={'80vh'}  flexWrap="wrap" gap={2}>
                    {isLoading ?<CircularProgress sx={{margin: 'auto'}} /> : enrolledCourses?.map((value) => (

                        <CourseCard  {...value} key={value._id} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default EnrolledCourses;
