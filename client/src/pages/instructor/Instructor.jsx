import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TeacherSideBar from '../../components/sideBar/TeacherSideBar'
import { useMediaQuery } from '@mui/material'

const drawerWidth = 300;
function Instructor() {

    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useEffect(() => {
        if (user?.role !== 'teacher') {

            navigate('/auth')
        }
    }, [])

    return (
        <>

            <TeacherSideBar drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                isMobile={isMobile} />
        </>
    )
}

export default Instructor