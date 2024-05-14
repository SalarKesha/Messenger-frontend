import React, { useContext, useState } from 'react'
import { useAuthState } from '../../../Context/auth-context'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'

export default function ContactItem({ contact }) {
    const { room, setRoom } = useContext(roomContext)
    const authState = useAuthState()
    const user = contact.user.id === authState.user ? contact.owner : contact.user
    const userNotSeen = contact.user.id === authState.user ? contact.user_not_seen : contact.owner_not_seen
    const [notSeen, setNotSeen] = useState(userNotSeen)
    const handleRoomChange = () => {
        // if (room.id !== contact.id || room.type !== roomTypes.CONTACT) {
        setNotSeen(null)
        setRoom({
            id: contact.id,
            type: roomTypes.CONTACT
        })
        // }
    }
    return (
        <li className="item" onClick={handleRoomChange}>
            <div className="image-container">
                <img className="image" src={user.image} alt="" />
            </div>
            <div className="text">
                <p className="title">
                    {user.username}
                </p>
                <p className="description">{contact.last_message}</p>
            </div>
            {notSeen ? <span className="notification">{notSeen}</span> : ''}
        </li>
    )
}
