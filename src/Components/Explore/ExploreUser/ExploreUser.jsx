import React, { useContext, useState } from 'react'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'
import ExploreUserPopup from './ExploreUserPopup'
export default function ExploreItem({ user, name, image, private_chat, mode }) {
    const { room, setRoom } = useContext(roomContext)
    const [popup, setPopup] = useState()
    const handlePopup = (flag) => {
        setPopup(flag)
    }
    const handleRoom = (private_chat_id) => {
        if (private_chat_id) {
            setRoom({
                id: private_chat_id,
                type: roomTypes.CONTACT
            })
        } else {
            setPopup(true)
        }
    }
    return (<>
        <li className="item" onClick={() => handleRoom(private_chat)}>
            <div className="image-container">
                <img className="image" src={image} alt="" />
            </div>
            <div className="text">
                <p className="title">
                    {name}
                </p>
            </div>
        </li>
        {popup && <ExploreUserPopup user={user} name={name} handleRoom={handleRoom} handlePopup={handlePopup} />}
    </>
    )
}
