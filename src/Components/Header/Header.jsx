import React, { useContext } from 'react'
import { callContext } from '../../Pages/Messenger/Messenger'
const callTypes = {
    VIDEO: 1,
    AUDIO: 2
}
export default function Header({ roomData, setActive }) {
    const { call, setCall } = useContext(callContext)
    const handleBackButton = () => {
        setActive(false)
    }
    const handleAudioCall = () => {
        setCall({ user: roomData.callee, type: callTypes.AUDIO })
    }
    const handleVideoCall = () => {
        setCall({ user: roomData.callee, type: callTypes.VIDEO })
    }
    return (
        <header className="chat-header-section">
            <button className="back-button" onClick={handleBackButton}>
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h24v24h-24z" fill="none" /><path d="m19 11h-11.17l4.88-4.88c.39-.39.39-1.03 0-1.42s-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-4.88-4.88h11.17c.55 0 1-.45 1-1s-.45-1-1-1z" /></svg>
            </button>
            <div className="user-container">
                <div className="image-container">
                    <img className="image" src={roomData.image} alt="" />
                </div>
                <div className="text">
                    <p className="title">{roomData.name}</p>
                    {/* <p className="status">online</p> */}
                </div>
            </div>
            {roomData.hasCall &&
                <div className="call-container">
                    <svg className="voice" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" onClick={handleAudioCall}>
                        <path fill="#fff"
                            d="m497.39 361.8-112-48a24 24 0 0 0 -28 6.9l-49.6 60.6a370.66 370.66 0 0 1 -177.19-177.19l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112a24.16 24.16 0 0 0 -27.5-13.9l-104 24a24 24 0 0 0 -18.6 23.39c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0 -14.01-27.6z" />
                    </svg>
                    <svg onClick={handleVideoCall} className="video" enableBackground="new 0 0 48 48" viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m8 12h22c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4h-22c-2.2 0-4-1.8-4-4v-16c0-2.2 1.8-4 4-4z"
                            fill="#fff" />
                        <path d="m44 35-10-6v-10l10-6z" fill="#fff" />
                    </svg>
                </div>
            }
        </header>
    )
}
