import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { useSelector } from 'react-redux';

function DashboardComp({ courses, totalStudents, createdCourse }) {
    const { users, isLoading, error } = useSelector((state) => state.user)

    const enrolledStudents = createdCourse?.map((course) => {
        users?.enrolledCourses.includes(course)
    })
    console.log(enrolledStudents);


    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={3} mb={5}>

                <Box sx={{ width: '49%', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", padding: '20px', }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={'bold'} fontSize={16}>Total Students</Typography>
                        <Typography><PeopleOutlineOutlinedIcon /></Typography>
                    </Box>
                    <Typography fontWeight={'bold'} fontSize={21}>{totalStudents}</Typography>
                </Box>

                <Box sx={{ width: '49%', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", padding: '20px', }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={'bold'} fontSize={16}>Total Courses</Typography>
                        <Typography><MenuBookOutlinedIcon /></Typography>
                    </Box>
                    <Typography fontWeight={'bold'} fontSize={21}>{courses || '0'}</Typography>
                </Box>

            </Box>

            <Box sx={{ padding: '20px', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", }} >
                <Typography fontWeight={'bold'} fontSize={18}>Students List</Typography>
                {isLoading ? <Box sx={{ minHeight: '400px', display: 'flex', justifyContent: "center", alignItems: 'center' }}> <CircularProgress /> </Box> : error ? { error } :
                    <table style={{ width: '100%' }}>

                        <thead style={{ color: '#999999' }}>

                            <tr>
                                <td style={{ borderTop: 'none' }}>Course Name</td>
                                <td style={{ borderTop: 'none' }}>Student Name</td>
                                <td style={{ borderTop: 'none' }}>Student Email</td>
                            </tr>
                        </thead>

                        <tbody>
                           
                                {users?.map((user) => (
                                    <tr key={user?._id}>
                                        <td style={{ fontWeight: 'bold' }}>
                                            {user?.enrolledCourses?.map((enrolled, idx) => (
                                                <span key={idx}>
                                                    {enrolled?.courseId?.title}
                                                    {idx < user.enrolledCourses.length - 1 && ", "}
                                                </span>
                                            ))}
                                        </td>
                                        <td>{user?.username}</td>
                                        <td>{user?.email}</td>
                                    </tr>
                                ))}
                            
                        </tbody>
                    </table>}
            </Box>

        </>
    )
}

export default DashboardComp