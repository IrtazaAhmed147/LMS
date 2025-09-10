import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getTeacherCourses } from '../../redux/actions/courseActions';
import { handleLogout, notify } from '../../utils/HelperFunctions';
import { singleCourseSuccess } from '../../redux/slices/courseSlice';
import DeleteModal from '../modal/DeleteModal';

function CoursesComp() {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { teacherCourses, isLoading, error } = useSelector((state) => state.course)
    const [againCall, setAgainCall] = useState(false)
    const token = localStorage.getItem("token")
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    
    useEffect(() => {
        
        
        if (user?.createdCourses?.length === 0) return
        dispatch(getTeacherCourses(user?._id, token))
    }, [againCall, error])

    const handleDelete = (id) => {

        dispatch(deleteCourse(token, id)).then((msg) => {
            setAgainCall(prev => !prev)
            setModal(false);
            notify('success', msg)
        }).catch((msg) => notify('error', msg))

    }
    return (
        <>
            <Box mt={3} sx={{ padding: { md: '20px', xs: '5px' }, border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", }} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Typography fontWeight={'bold'} sx={{ fontSize: { md: 25, xs: 15, sm: 20 } }}>All Courses</Typography>
                    <Link to={'/instructor/create-new-course'}>
                        <button className='common-btn' onClick={() => dispatch(singleCourseSuccess({}))}>Create New Course</button>
                    </Link>
                </Box>
                {isLoading ?
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '40vh'
                    }}>

                        <CircularProgress color='inherit' />
                    </Box>
                    : error ? <p> {error} </p> :
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
                                        <td style={{ fontWeight: 'bold' }}><Link style={{ color: '#000' }} to={`/instructor/create-new-lecture/${course._id}`}>{course?.title}</Link></td>
                                        <td>{course?.enrolledStudents?.length}</td>
                                        <td>
                                            <span style={{ marginRight: '5px' }} onClick={() => dispatch(singleCourseSuccess(course))}>
                                                <Link style={{ color: '#000' }} to={'/instructor/create-new-course'}>
                                                    <BorderColorOutlinedIcon fontSize='small' />
                                                </Link>
                                            </span>

                                            <span onClick={() => {
                                                setSelectedCourseId(course?._id)
                                                setModal(true)
                                            }}>
                                                <BackspaceOutlinedIcon fontSize='small' />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                }


                {modal && <DeleteModal
                    type='Course'
                    setModal={setModal}
                    id={selectedCourseId}
                    handleDelete={handleDelete}
                />
                }
            </Box>
        </>
    )
}

export default CoursesComp