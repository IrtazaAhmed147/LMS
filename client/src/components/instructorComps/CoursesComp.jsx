import { Box, Typography } from '@mui/material'
import React from 'react'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Link } from 'react-router-dom';

function CoursesComp() {
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
                <table style={{ width: '100%' }}>

                    <thead style={{ color: '#999999' }}>

                        <tr>
                            <td style={{ borderTop: 'none' }}>Course</td>
                            <td style={{ borderTop: 'none' }}>Students</td>
                            <td style={{ borderTop: 'none' }}>Actions</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>React & Redux Complete Course 2024</td>
                            <td>2</td>
                            <td style={{ display: 'flex', gap: '10px' }}><BorderColorOutlinedIcon /> <BackspaceOutlinedIcon /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>React & Redux Complete Course 2024</td>
                            <td>2</td>
                            <td style={{ display: 'flex', gap: '10px' }}><BorderColorOutlinedIcon /> <BackspaceOutlinedIcon /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>React & Redux Complete Course 2024</td>
                            <td>2</td>
                            <td style={{ display: 'flex', gap: '10px' }}><BorderColorOutlinedIcon /> <BackspaceOutlinedIcon /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>React & Redux Complete Course 2024</td>
                            <td>2</td>
                            <td style={{ display: 'flex', gap: '10px' }}><BorderColorOutlinedIcon /> <BackspaceOutlinedIcon /></td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </>
    )
}

export default CoursesComp