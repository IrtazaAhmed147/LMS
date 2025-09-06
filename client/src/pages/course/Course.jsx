import React, { useEffect, useRef } from 'react';
import './course.css';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourse } from '../../redux/actions/courseActions';
import CourseSideBar from '../../components/sideBar/CoursesSideBar';
import CourseCard from '../../components/card/CourseCard';
import { useState } from 'react';
function Course() {

  const dispatch = useDispatch()
  const { course, isLoading, error, language, categories } = useSelector((state) => state.course)
  const searchValue = useRef('')
  const [sortBy, setSortBy] = useState('Sort By')
  useEffect(() => {
    console.log(language);
    if (categories.length !== 0 && language.length !== 0 && sortBy ) {

      dispatch(getAllCourse({ categories, language,sortBy }))
    } else if (categories.length !== 0) {
      dispatch(getAllCourse({ categories }))
    } else if (language.length !== 0) {
      dispatch(getAllCourse({ language }))
    } else if(sortBy) {
      dispatch(getAllCourse({ sortBy }))

    } else{

      dispatch(getAllCourse())
    }
    console.log(course);

  }, [language, categories, sortBy])


  const handleSearch = async () => {
    try {
      // dispatch(getAllCourse({ title: searchValue.current }))
      console.log(searchValue);
    } catch (error) {
      console.log(error);

    }

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSortBy(value);
  }

  return (
    <Box minHeight="100vh" py={4} display={'flex'}>
      <CourseSideBar drawerWidth={300} />
      <Box width={'100%'} p={2}>
        <Box display={'flex'} gap={1} justifyContent={'end'} alignItems={'center'}>
          <Select name='sort' onChange={handleChange} value={sortBy} width={'auto'} sx={{ border: '1px solid #ddd', color: 'black' }} >
            <MenuItem value={'Sort By'} disabled={true}>Sort By</MenuItem>
            <MenuItem value={'Newest'}>Newest</MenuItem>
          </Select>
          <Typography fontWeight={'bold'}>{course?.length || `0`} results</Typography>
        </Box>

        {isLoading ? <CircularProgress /> : error ? { error } : course?.map((item) => (
          <CourseCard {...item} key={item._id} />
        ))}

      </Box>
    </Box>
  );
}

export default Course;
