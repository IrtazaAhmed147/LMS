import React, { useRef } from 'react'
import './Otp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../utils/HelperFunctions'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'

function Otp() {

    const otp = useRef()
    const token = localStorage.getItem('tempToken')
    const { user } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    const handleForm = async (e) => {
        e.preventDefault()
        if (otp.current.length !== 6) return
        if (!token) return
        try {
            setLoading(true)
            const res = await axios.post(
                'http://localhost:8800/api/auth/verifyEmail',
                { otp: otp.current },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            localStorage.removeItem('tempToken')

            setLoading(false)
            notify('success', res?.data?.message)
            navigate('/auth')
        } catch (error) {
            setLoading(false)
            console.log(error);
            if( error?.response?.data?.message) {

                notify('error', error?.response?.data?.message)
            } else {
                notify('error', error?.message)

            }
        }
    }

    return (
        <div>
            <section className='otp-container'>
                <div className="otp-box">
                    <h1 className="title">Verify Your OTP</h1>
                    <p>Enter the 6 digit-code sent to your email</p>
                    <form onSubmit={handleForm}>
                        <div id="otp-form">
                            <input type="text" name='input' onChange={(e) => otp.current = e.target.value} className="otp-input" maxLength="6" required />
                        </div>
                        <button id="verify-btn" disabled={loading}>Verify OTP</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Otp