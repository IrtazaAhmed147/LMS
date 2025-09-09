import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from '../../components/card/CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from '../../redux/actions/courseActions';
import { useParams } from 'react-router-dom';
import FeatureCard from '../../components/card/FeatureCard';

const EnrolledCourses = () => {
    const dispatch = useDispatch()


    const token = localStorage.getItem('token')
    const { enrolledCourses, isLoading, error } = useSelector((state) => state.course)
    useEffect(() => {
        dispatch(getEnrolledCourses(token))
    }, [])

    return (
        <Box
            flex={1}
            // bgcolor="#f5f5f5"
            minHeight="100vh"
            py={1}
            px={3}
            sx={{
                width: '100%', // Adjust for sidebar
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    My Courses
                </Typography>



                {/* Courses Grid */}
                <Box display="flex" minHeight={'80vh'} marginTop='20px' flexWrap="wrap" gap={2}>
                    {isLoading ?
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '30vh'
                        }}>

                            <CircularProgress color='inherit' />
                        </Box>:  error ? (
                                  <Typography color="error">{error}</Typography>
                                ) 
                        : enrolledCourses?.map((value) => (

                            <FeatureCard  {...value} key={value._id} />
                        ))}
                </Box>
            </Box>
        </Box>
    );
};

export default EnrolledCourses;
