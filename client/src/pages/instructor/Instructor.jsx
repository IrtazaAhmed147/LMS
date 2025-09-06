import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TeacherSideBar from '../../components/sideBar/TeacherSideBar'
import { Box, Typography, useMediaQuery } from '@mui/material'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import './instructor.css'
import DashboardComp from '../../components/instructorComps/DashboardComp'
import CoursesComp from '../../components/instructorComps/CoursesComp'
import { getTeacherCourses } from '../../redux/actions/courseActions'
import { getAllUsers } from '../../redux/actions/userActions'

const drawerWidth = 300;
function Instructor() {

    const { user } = useSelector((state) => state.auth)
  const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');
    const { isDashboard, isCourse } = useSelector((state) => state.dashboard)
    const { teacherCourses } = useSelector((state) => state.course)
   
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const dispatch = useDispatch()

    useEffect(() => {

        // console.log(againCall);
        dispatch(getTeacherCourses(user?._id, token))
        if(user?.role === 'teacher') {

            dispatch(getAllUsers({courses: user?.createdCourses}))
            
        }
        console.log(teacherCourses);

    }, [])

    let totalStudents = 0;
    teacherCourses?.map((course)=> {
        totalStudents = course.enrolledStudents.length + totalStudents
    })
    return (
        <>

            <Box sx={{ display: 'flex' }}>

                <TeacherSideBar drawerWidth={drawerWidth}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    isMobile={isMobile} />


                <Box sx={{ width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`, backgroundColor: '#f3f3f3', minHeight: '100vh', padding: '30px' }}>

                    <Typography fontWeight={'bold'} variant='h4'>Dashboard</Typography>


                    {isDashboard && <DashboardComp createdCourses={user?.createdCourses} courses={teacherCourses?.length} totalStudents={totalStudents} />}
                    {isCourse && <CoursesComp  />}
                </Box>

            </Box>
        </>


    )
}

export default Instructor