import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TeacherSideBar from '../../components/sideBar/TeacherSideBar'
import { Box, Typography, useMediaQuery } from '@mui/material'
import './instructor.css'
import DashboardComp from '../../components/instructorComps/DashboardComp'
import CoursesComp from '../../components/instructorComps/CoursesComp'
import { getAllUsers } from '../../redux/actions/userActions'
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 300;
function Instructor() {

    const { user } = useSelector((state) => state.auth)
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');
    const { isDashboard, isCourse } = useSelector((state) => state.dashboard)
    const { teacherCourses } = useSelector((state) => state.course)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const dispatch = useDispatch()

    useEffect(() => {

        if (user?.createdCourses?.length === 0) return

        if (user?.role === 'teacher') {

            dispatch(getAllUsers({ courses: user?.createdCourses }))

        }

    }, [])

    return (
        <>

            <Box sx={{ display: 'flex' }}> 

                <TeacherSideBar drawerWidth={drawerWidth}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    isMobile={isMobile} />


                <Box sx={{ width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`, backgroundColor: '#f3f3f3', minHeight: '100vh', padding: { md: '30px', xs: '5px' } }}>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>

                        <Typography fontWeight={'bold'} variant='h4'>
                            Dashboard
                        </Typography>
                        <Box sx={{display:{xs:'block',md:'none', cursor:'pointer'}}}  onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </Box>
                    </Box>


                    {isDashboard && <DashboardComp courses={teacherCourses?.length} />}
                    {isCourse && <CoursesComp />}
                </Box>

            </Box>
        </>


    )
}

export default Instructor