import React, { useContext, useState } from 'react'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'
export default function GroupItem({ key, groupMember }) {
    const { room, setRoom } = useContext(roomContext)
    const [notSeen, setNotSeen] = useState(groupMember.not_seen)
    const handleRoomChange = () => {
        setNotSeen(null)
        setRoom(state => {
            return {
                id: groupMember.group.id,
                type: roomTypes.GROUP
            }
        })
    }
    return (
        <li className="item" onClick={handleRoomChange}>
            <div className="image-container">
                <img className="image" src={groupMember.group.image} alt="" />
            </div>
            <div className="text">
                <p className="title">
                    {groupMember.group.name}
                </p>
                <p className="description">{groupMember.last_message}</p>
            </div>
            {notSeen ? <span className="notification">{notSeen}</span> : ''}
        </li>
    )
}
