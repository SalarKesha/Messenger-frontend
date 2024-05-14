import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import '../../assets/styles/login.css'
import { notify, useRequest } from '../../Requests/requests'
import { useNavigate } from 'react-router-dom'
import { useAuthState, useAuthDispatch } from '../../Context/auth-context'
import { actionTypes } from '../../Context/reducer'
export default function SignUp() {
    const { postReq } = useRequest()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const passwordInput = useRef()
    const authDispatch = useAuthDispatch()
    const authState = useAuthState()
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
    const validateInputs = () => {
        if (username && password) {
            if (username.length < 4) {
                notify('Username is too short')
                return false
            } else if (username.length > 36) {
                notify('Username is too long')
                return false
            } else if (password.length < 8) {
                notify('password must be more than 8 characters')
                return false
            } else if (password.length > 128) {
                notify('password must be less than 128 characters')
                return false
            } else {
                return true
            }
        } else {
            notify('Please fill in the fields')
            return false
        }
    }
    const handleSingUp = () => {
        if (validateInputs()) {
            postReq('user/create/', {
                username: username,
                password: password
            }).then(({ data, status }) => {
                if (status === 201) {
                    const userId = data.id
                    notify('Signed Up Success')
                    postReq('api/token/', {
                        username: username,
                        password: password
                    }).then(({ data, status }) => {
                        if (status === 200) {
                            localStorage.setItem('access_token', data.access)
                            localStorage.setItem('refresh_token', data.refresh)
                            authDispatch({
                                type: actionTypes.LOGIN_SUCCESS,
                                payload: { user: userId, token: data.access }
                            })
                            navigate('/')
                        }
                    }).catch(() => {
                        notify('Something went wrong', 'error')
                    })
                }
            }).catch(() => {
                notify('This username already exists')
            })
        }
    }

    return (
        <Layout>
            <div className="login-container">
                <form className="login-form" action="">
                    <h1 className="title">Sign up</h1>
                    <div className="input-container">
                        <label htmlFor="username-input">Username</label>
                        <input value={username} id="username-input" type="text" onChange={handleUsernameInput} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password-input">Password</label>
                        <div className="password-wrapper">
                            <input value={password} ref={passwordInput} id="password-input" type="password" onChange={handlePasswordInput} required />
                            <button type='button' className='password-toggle-show-btn' onClick={handleToggleShowPassword}>
                                <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg"><g fill="#4e4e4e"><path d="m1.97408 6.65857c-.0875.26168-.37048.40305-.6323.31578-.26197-.08733-.403554-.37049-.31623-.63246-.00911.03046.00037-.00111.00037-.00111.00553-.0164.01143-.03267.01747-.04889.01029-.02765.02508-.06585.04477-.1131.03933-.09441.09843-.22545.18048-.38092.16366-.31009.42137-.72249.80017-1.13573.76531-.83488 2.01773-1.66214 3.93108-1.66214s3.16577.82726 3.93108 1.66214c.37883.41324.63653.82564.80013 1.13573.0821.15547.1412.28651.1805.38092.0197.04725.0345.08545.0448.1131.0031.00826.0134.06058.0233.11084.009.0457.0177.08969.0203.09727 0 0 .0835.33252-.342.47435-.2614.08714-.5439-.05367-.6319-.31459l-.0004-.00119-.0004-.00109-.0061-.01675c-.006-.01629-.0162-.04254-.03065-.07732-.02902-.06966-.0754-.17299-.14179-.29878-.13322-.25241-.34425-.59001-.65295-.92677-.60969-.66512-1.60727-1.33786-3.19392-1.33786s-2.58423.67274-3.19392 1.33786c-.3087.33676-.51973.67436-.65295.92677-.06638.12579-.11276.22912-.14179.29878-.01449.03478-.0246.06103-.03066.07732z" /><path d="m4 7c0-1.10457.89543-2 2-2s2 .89543 2 2-.89543 2-2 2-2-.89543-2-2z" /></g></svg>
                            </button>
                        </div>
                        <p className="navigate">Already have an account? <Link to={'/login'}>Login</Link></p>
                    </div>
                    <button className="submit" type="button" onClick={handleSingUp} >Sign up</button>
                </form>
            </div>
        </Layout>
    )
}
