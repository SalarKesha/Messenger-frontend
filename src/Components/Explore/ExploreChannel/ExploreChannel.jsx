import React, { useContext, useState } from 'react'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'
import ExploreChannelPopup from './ExploreChannelPopup/ExploreChannelPopup'
export default function ExploreChannel({ channel, name, image, mode, joined }) {
    const { room, setRoom } = useContext(roomContext)
    const [popup, setPopup] = useState()
    const handlePopup = (flag) => {
        setPopup(flag)
    }
    const handleJoin = (channel_id) => {
        setRoom({
            id: channel_id,
            type: roomTypes.CHANNEL
        })
    }
    const handleRoom = (channel_id) => {
        if (joined) {
            handleJoin(channel_id)
        } else {
            setPopup(true)
        }
    }
    return (
        <>
            <li className="item" onClick={() => handleRoom(channel)}>
                <div className="image-container">
                    <img className="image" src={image} alt="" />
                </div>
                <div className="text">
                    <p className="title">
                        {name}
                    </p>
                </div>
            </li>
            {popup && <ExploreChannelPopup channel={channel} name={name} handleJoin={handleJoin} handlePopup={handlePopup} />}
        </>
    )
}