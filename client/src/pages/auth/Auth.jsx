import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../redux/actions/authActions';
import { Box, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { notify } from '../../utils/HelperFunctions';
import { useState } from 'react';
function Auth() {

    const [isLogin, setIsLogin] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const { isLoading, error, user } = useSelector((state) => state.auth)
    const form = useRef({
        role: 'student',
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        if (user?.role === 'student') {
            navigate('/')
        } else if (user?.role === 'teacher') {
            navigate('/instructor')

        }
    }, [user])

    const handleForm = async (e) => {
        e.preventDefault()

        if (isLogin) {
            if (!form.current.username.trim() || !form.current.password.trim()) return;
            dispatch(loginUser(form.current, navigate))
                .then((msg) => {
                    notify('success', msg)
                })
                .catch((err) => {
                    notify('error', err)

                })

        } else {
            if (!form.current.username.trim() || !form.current.email.trim() || !form.current.password.trim() || !form.current.role) return notify('error', 'missing fields');
            dispatch(registerUser(form.current))
                .then((msg) => {
                    notify('success', msg)
                    navigate('/otp')
                    setIsLogin(true)
                })
                .catch((err) => notify('error', err))
        }


    }
    const handleShowPassword = () => {
        setShowPass((prev) => !prev)
    }


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100%', }}>
                <Box width={'400px'}>
                    <Box sx={{ padding: '4px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#f9f9f9', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px', overflow: 'hidden', height: '30px', width: '100%', marginBottom: '15px' }}>

                        <Box onClick={() => setIsLogin(true)} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: isLogin ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Typography fontSize={15} >Sign In</Typography>
                        </Box>
                        <Box onClick={() => setIsLogin(false)} sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: isLogin ? 'transparent' : 'white', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Typography fontSize={15} >Sign Up</Typography>
                        </Box>

                    </Box>

                    {!isLogin && <Box sx={{ boxShadow: '1px 1px 6px -1px #c1c1c1', width: '100%', borderRadius: '10px', padding: '30px' }}>
                        <Box marginBottom={'20px'}>

                            <Typography fontWeight={'bold'} fontSize={20}>Create a new account</Typography>
                            <Typography fontSize={13} color='gray'>Enter your details to get started</Typography>
                        </Box>
                        <form onSubmit={handleForm}>

                            <label >
                                <Typography fontWeight={'bold'}>Username</Typography>
                                <input onChange={(e) => form.current.username = e.target.value} className='authInput' required type="text" placeholder='Enter username' />
                            </label>
                            <label >
                                <Typography fontWeight={'bold'}>User Email</Typography>
                                <input onChange={(e) => form.current.email = e.target.value} className='authInput' required type="email" placeholder='Enter your email' />
                            </label>
                            <label >
                                <Typography fontWeight={'bold'}>Password</Typography>
                                <input onChange={(e) => form.current.password = e.target.value} className='authInput' required type="password" placeholder='' />
                            </label>
                            <Typography fontWeight={'bold'}>Role</Typography>
                            <Select sx={{ width: '100%' }} defaultValue={'student'} onChange={(e) => form.current.role = e.target.value}>
                                <MenuItem value='student'>Student</MenuItem>
                                <MenuItem value='teacher'>Teacher</MenuItem>
                            </Select>

                            <button className='authBtn'>{isLoading && <CircularProgress color="inherit" size="20px" />} Sign Up</button>
                        </form>

                    </Box>}
                    {isLogin && <Box sx={{ boxShadow: '1px 1px 6px -1px #c1c1c1', width: '100%', borderRadius: '10px', padding: '30px' }}>
                        <Box marginBottom={'20px'}>

                            <Typography fontWeight={'bold'} fontSize={20}>Sign in to your account</Typography>
                            <Typography fontSize={13} color='gray'>Enter your email and password to access your account</Typography>
                        </Box>
                        <form onSubmit={handleForm}>

                            <label >
                                <Typography fontWeight={'bold'} >UserName</Typography>
                                <input className='authInput' onChange={(e) => form.current.username = e.target.value} type="text" required placeholder='Enter your username' />
                            </label>
                            <label >
                                <Typography fontWeight={'bold'}>Password</Typography>
                                <input className='authInput' onChange={(e) => form.current.password = e.target.value} type="password" required placeholder='' />
                            </label>

                            <button className='authBtn'>{isLoading && <CircularProgress color="inherit" size="20px" />} Sign In</button>

                        </form>
                    </Box>}


                </Box>
            </Box>
        </>
    )
}

export default Auth