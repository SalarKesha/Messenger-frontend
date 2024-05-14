import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../assets/styles/messenger.css'
import Layout from '../../Components/Layout'
import { notify, useRequest } from '../../Requests/requests'
import Main from '../../Components/Main/Main'
import Aside from '../../Components/Aside/Aside'
import { getSocketReq } from '../../Requests/requests'
import { useAuthState } from '../../Context/auth-context'
import { useNavigate } from 'react-router-dom'
export const roomTypes = {
    PROFILE: 'profile',
    CONTACT: 'contact',
    GROUP: 'group',
    CHANNEL: 'channel',
    CALL: 'call',
    EXPLORE: 'explore'
}

export const roomContext = React.createContext()
export const userContext = React.createContext()
export const callContext = React.createContext()

export default function Messenger() {
    const navigate = useNavigate()
    const authState = useAuthState()
    const { getReq } = useRequest()
    const [user, setUser] = useState()
    const [room, setRoom] = useState({
        id: null,
        type: roomTypes.PROFILE
    })
    const socketRef = useRef(null)
    const [call, setCall] = useState(null)
    useEffect(() => {
        getReq('user/me/').then(({ data, status }) => {
            setUser({
                id: data.id,
                username: data.username,
                image: data.image
            })
        })
    }, [])
    useEffect(() => {
        socketRef.current = new WebSocket(getSocketReq('call/'))
        socketRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data)
            if (data.call_id) {
                if (data.callee_id === authState.user || data.caller_id === authState.user) {
                    if (data.call_type === 1) {
                        navigate(`/video-call/${data.call_id}`)
                    } else {
                        navigate(`/audio-call/${data.call_id}`)
                    }
                }
            } else {
                if (data.caller_id === authState.user) {
                    notify('User is not online', 'error')
                }
            }
        }
        socketRef.current.onclose = () => {
            console.log('call socket closed');
        }
        socketRef.current.onopen = () => {
            console.log('call socket opened');
        }
        return () => {
            if (socketRef.current) {
                socketRef.current.close()
            }
        }
    }, [])
    useEffect(() => {
        if (call && socketRef.current) {
            socketRef.current.send(JSON.stringify({ user_id: call.user, call_type: call.type }))
        }
    }, [call])
    return (
        <Layout>
            {user &&
                <userContext.Provider value={{ user, setUser }}>
                    <roomContext.Provider value={{ room, setRoom }}>
                        <callContext.Provider value={{ call, setCall }}>
                            <div className="messenger-container">
                                <Aside />
                                <Main />
                            </div>
                        </callContext.Provider>
                    </roomContext.Provider>
                </userContext.Provider>
            }
        </Layout>
    )
}
