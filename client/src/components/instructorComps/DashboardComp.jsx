import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { useSelector } from 'react-redux';

function DashboardComp({ courses }) {
    const { users, isLoading, error } = useSelector((state) => state.user)
    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={3} mb={5}>

                <Box sx={{ width: '49%', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", padding: { md: '20px', xs: '10px' }, }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={'bold'} fontSize={16}>Total Students</Typography>
                        <Typography><PeopleOutlineOutlinedIcon /></Typography>
                    </Box>
                    <Typography fontWeight={'bold'} fontSize={21}>{users?.length || 0}</Typography>
                </Box>

                <Box sx={{ width: '49%', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", padding: { md: '20px', xs: '10px' }, }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={'bold'} fontSize={16}>Total Courses</Typography>
                        <Typography><MenuBookOutlinedIcon /></Typography>
                    </Box>
                    <Typography fontWeight={'bold'} fontSize={21}>{courses || '0'}</Typography>
                </Box>

            </Box>

            <Box sx={{ padding: { md: '20px', xs: '5px' }, border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", }} >
                <Typography fontWeight={'bold'} fontSize={18}>Students List</Typography>
                {isLoading ?
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '30vh'
                    }}>

                        <CircularProgress color='inherit' />
                    </Box>
                    : error ? { error } :
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