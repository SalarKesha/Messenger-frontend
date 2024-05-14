import React, { useContext, useState } from 'react'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'
export default function ChannelItem({ key, channelMember }) {
    const { room, setRoom } = useContext(roomContext)
    const [notSeen, setNotSeen] = useState(channelMember.not_seen)
    const handleRoomChange = () => {
        setNotSeen(null)
        setRoom({
            id: channelMember.channel.id,
            type: roomTypes.CHANNEL
        })
    }
    return (
        <li className="item" onClick={handleRoomChange}>
            <div className="image-container">
                <img className="image" src={channelMember.channel.image} alt="" />
            </div>
            <div className="text">
                <p className="title">
                    {channelMember.channel.name}
                </p>
                <p className="description">{channelMember.last_message}</p>
            </div>
            {notSeen ? <span className="notification">{notSeen}</span> : ''}
        </li>
    )
}