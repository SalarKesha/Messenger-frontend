import React, { useContext } from 'react'
import { useAuthState } from '../../../Context/auth-context'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'

export default function CallItem({ key, call }) {
    const { room, setRoom } = useContext(roomContext)
    const authState = useAuthState()
    const callUser = authState.user === call.caller.id ? call.callee : call.caller
    const handleRoomChange = () => {
        setRoom({
            id: call.private_chat,
            type: roomTypes.CONTACT
        })
    }
    return (
        <li className="item" onClick={handleRoomChange}>
            <div className="image-container">
                <img className="image" src={callUser.image} alt="" />
            </div>
            <div className="text">
                <p className="title">
                    {callUser.username}
                </p>
                <p className="description">{call.created_time}</p>
            </div>
            {/* {call.not_seen ? <span className="notification">{channelMember.not_seen}</span> : ''} */}
        </li>
    )
}
