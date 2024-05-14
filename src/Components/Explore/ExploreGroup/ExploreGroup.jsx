import React, { useContext, useState } from 'react'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'
import ExploreGroupPopup from './ExploreGroupPopup/ExploreGroupPopup'
export default function ExploreGroup({ group, name, image, mode, joined }) {
    const { room, setRoom } = useContext(roomContext)
    const [popup, setPopup] = useState()
    const handlePopup = (flag) => {
        setPopup(flag)
    }
    const handleJoin = (group_chat_id) => {
        setRoom({
            id: group_chat_id,
            type: roomTypes.GROUP
        })
    }
    const handleRoom = (group_chat_id) => {
        if (joined) {
            handleJoin(group_chat_id)
        } else {
            setPopup(true)
        }
    }
    return (<>
        <li className="item" onClick={() => handleRoom(group)}>
            <div className="image-container">
                <img className="image" src={image} alt="" />
            </div>
            <div className="text">
                <p className="title">
                    {name}
                </p>
            </div>
        </li>
        {popup && <ExploreGroupPopup group={group} name={name} handleJoin={handleJoin} handlePopup={handlePopup} />}
    </>
    )
}