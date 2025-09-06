import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getTeacherCourses } from '../../redux/actions/courseActions';
import { notify } from '../../utils/HelperFunctions';

function CoursesComp() {


    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { teacherCourses, isLoading, error } = useSelector((state) => state.course)
    const [againCall, setAgainCall] = useState(false)
    const token = localStorage.getItem("token")
    // useEffect(() => {
        
    //     console.log(againCall);
    //     dispatch(getTeacherCourses(user?._id, token))
    //     console.log(teacherCourses);

    // }, [againCall])

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteCourse(token, id)).then((msg) => {
            setAgainCall(prev=> !prev)
            
            notify('success', msg)}).catch((msg) => notify('error', msg))

    }

    return (
        <>
            <Box mt={3} sx={{ padding: '20px', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", }} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Typography fontWeight={'bold'} fontSize={25}>All Courses</Typography>
                    <Link to={'/instructor/create-new-course'}>
                        <button className='create-course-btn' style={{
                            color: 'white', padding: '10px 20px', width: 'auto'
                        }}>Create New Course</button>
                    </Link>
                </Box>
                {isLoading ? <Box sx={{minHeight:'400px', display:'flex', justifyContent:"center", alignItems:'center'}}> <CircularProgress /> </Box> : error ? { error } :
                    <table style={{ width: '100%' }}>

                        <thead style={{ color: '#999999' }}>

                            <tr>
                                <td style={{ borderTop: 'none' }}>Course</td>
                                <td style={{ borderTop: 'none' }}>Students</td>
                                <td style={{ borderTop: 'none' }}>Actions</td>
                            </tr>
                        </thead>

                        <tbody>
                            {teacherCourses?.map((course) => (
                                <tr key={course._id}>
                                    <td style={{ fontWeight: 'bold' }}>{course?.title}</td>
                                    <td>{course?.enrolledStudents?.length}</td>
                                    <td style={{ display: 'flex', gap: '10px' }}><BorderColorOutlinedIcon />
                                        <span onClick={() => handleDelete(course?._id)}>
                                            <BackspaceOutlinedIcon />
                                        </span>
                                    </td>
                                    <td><button><Link to={`/instructor/create-new-lecture/${course._id}`}>Lectures</Link></button></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                }
            </Box>
        </>
    )
}

export default CoursesComp