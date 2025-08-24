import React from 'react'
import { Box, Typography } from '@mui/material'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

function DashboardComp() {
  return (
    <>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={3} mb={5}>

                        <Box sx={{ width: '49%', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", padding: '20px', }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight={'bold'} fontSize={16}>Total Students</Typography>
                                <Typography><PeopleOutlineOutlinedIcon /></Typography>
                            </Box>
                            <Typography fontWeight={'bold'} fontSize={21}>5</Typography>
                        </Box>

                        <Box sx={{ width: '49%', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", padding: '20px', }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight={'bold'} fontSize={16}>Total Courses</Typography>
                                <Typography><MenuBookOutlinedIcon /></Typography>
                            </Box>
                            <Typography fontWeight={'bold'} fontSize={21}>7</Typography>
                        </Box>

                    </Box>

                    <Box sx={{ padding: '20px', border: '1px solid #e3e3e3', borderRadius: '10px', backgroundColor: "#fff", }} >
                        <Typography fontWeight={'bold'} fontSize={18}>Students List</Typography>
                        <table style={{width:'100%'}}>
                                
                            <thead style={{color: '#999999'}}>

                                <tr>
                                    <td style={{borderTop:'none'}}>Course Name</td>
                                    <td style={{borderTop:'none'}}>Student Name</td>
                                    <td style={{borderTop:'none'}}>Student Email</td>
                                </tr>
                            </thead>
                                
                            <tbody>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>React & Redux Complete Course 2024</td>
                                    <td>John Doe</td>
                                    <td>john@gmail.com</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>React & Redux Complete Course 2024</td>
                                    <td>John Doe</td>
                                    <td>john@gmail.com</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>React & Redux Complete Course 2024</td>
                                    <td>John Doe</td>
                                    <td>john@gmail.com</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>React & Redux Complete Course 2024</td>
                                    <td>John Doe</td>
                                    <td>john@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>

    </>
  )
}

export default DashboardComp