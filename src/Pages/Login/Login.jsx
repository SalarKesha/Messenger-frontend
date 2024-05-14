import React, { useLayoutEffect, useRef, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import '../../assets/styles/login.css'
import { useAuthState, useAuthDispatch } from '../../Context/auth-context'
import { notify } from '../../Requests/requests'
import { actionTypes } from '../../Context/reducer'
import { useRequest } from '../../Requests/requests'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const passwordInput = useRef()
    const { getReq, postReq } = useRequest()
    const authDispatch = useAuthDispatch()
    const authState = useAuthState()
    const navigate = useNavigate()
    const location = useLocation()
    const handleUsernameInput = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }
    const handleToggleShowPassword = (e) => {
        const passwordToggleShowButton = e.currentTarget
        passwordToggleShowButton.classList.toggle('active')
        if (passwordToggleShowButton.classList.contains('active')) {
            passwordInput.current.type = 'text'
        } else {
            passwordInput.current.type = 'password'
        }
    }
    useLayoutEffect(() => {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
            authDispatch({
                type: actionTypes.LOGIN_REQUEST
            })
            postReq('api/token/refresh/', { refresh: refreshToken }).then(({ data, status }) => {
                if (status === 200) {
                    localStorage.setItem('access_token', data.access)
                    const accessToken = data.access
                    getReq('user/me/').then(({ data, status }) => {
                        if (status === 200) {
                            authDispatch({
                                type: actionTypes.LOGIN_SUCCESS,
                                payload: { user: data.id, token: accessToken }
                            })
                            navigate(location?.state?.from ? location.state.from : '/', { replace: true })
                        }
                    }).catch((err) => {
                        // authDispatch({
                        //     type: actionTypes.LOGIN_ERROR
                        // })
                    })
                }
            }).catch(() => {
                // authDispatch({
                //     type: actionTypes.LOGIN_ERROR
                // })
                // localStorage.removeItem('refresh_token')
            })
        }
    }, [])
    const handleLogin = () => {
        if (username && password) {
            authDispatch({
                type: actionTypes.LOGIN_REQUEST
            })
            postReq('api/token/', {
                username: username,
                password: password
            }).then(({ data, status }) => {
                if (status === 200) {
                    localStorage.setItem('access_token', data.access)
                    localStorage.setItem('refresh_token', data.refresh)
                    const accessToken = data.access
                    getReq('user/me/').then(({ data, status }) => {
                        if (status === 200) {
                            notify('Login successful', 'success')
                            authDispatch({
                                type: actionTypes.LOGIN_SUCCESS,
                                payload: { user: data.id, token: accessToken }
                            })
                            navigate(location?.state?.from ? location.state.from : '/', { replace: true })
                        }
                    }).catch(() => {
                        authDispatch({
                            type: actionTypes.LOGIN_ERROR
                        })
                        notify('Something went wrong', 'error')
                    })
                }
            }).catch(() => {
                authDispatch({
                    type: actionTypes.LOGIN_ERROR
                })
                notify('Username and password does not match', 'error')
            })
        } else {
            notify('Please fill in the feilds')
        }
    }
    return (
        <Layout>
            {authState?.loading ? <Loader /> :
                <div className="login-container">
                    <form className="login-form" action="">
                        <h1 className="title">Login</h1>
                        <div className="input-container">
                            <label htmlFor="username-input">Username</label>
                            <input value={username} id="username-input" type="text" onChange={handleUsernameInput} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password-input">Password</label>
                            <div className="password-wrapper">
                                <input value={password} ref={passwordInput} id="password-input" type="password" onChange={handlePasswordInput} />
                                <button type='button' className='password-toggle-show-btn' onClick={handleToggleShowPassword}>
                                    <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg"><g fill="#4e4e4e"><path d="m1.97408 6.65857c-.0875.26168-.37048.40305-.6323.31578-.26197-.08733-.403554-.37049-.31623-.63246-.00911.03046.00037-.00111.00037-.00111.00553-.0164.01143-.03267.01747-.04889.01029-.02765.02508-.06585.04477-.1131.03933-.09441.09843-.22545.18048-.38092.16366-.31009.42137-.72249.80017-1.13573.76531-.83488 2.01773-1.66214 3.93108-1.66214s3.16577.82726 3.93108 1.66214c.37883.41324.63653.82564.80013 1.13573.0821.15547.1412.28651.1805.38092.0197.04725.0345.08545.0448.1131.0031.00826.0134.06058.0233.11084.009.0457.0177.08969.0203.09727 0 0 .0835.33252-.342.47435-.2614.08714-.5439-.05367-.6319-.31459l-.0004-.00119-.0004-.00109-.0061-.01675c-.006-.01629-.0162-.04254-.03065-.07732-.02902-.06966-.0754-.17299-.14179-.29878-.13322-.25241-.34425-.59001-.65295-.92677-.60969-.66512-1.60727-1.33786-3.19392-1.33786s-2.58423.67274-3.19392 1.33786c-.3087.33676-.51973.67436-.65295.92677-.06638.12579-.11276.22912-.14179.29878-.01449.03478-.0246.06103-.03066.07732z" /><path d="m4 7c0-1.10457.89543-2 2-2s2 .89543 2 2-.89543 2-2 2-2-.89543-2-2z" /></g></svg>
                                </button>
                            </div>
                            <p className="navigate">You have not registered? <Link to={'/signUp'}>Signup</Link></p>
                        </div>
                        <button className="submit" type="button" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            }
        </Layout>
    )
}
