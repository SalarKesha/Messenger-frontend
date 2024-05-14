import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import Chats from '../Chats/Chats'
import { roomContext, roomTypes } from '../../Pages/Messenger/Messenger'
import { useRequest } from '../../Requests/requests'
import { useAuthState } from '../../Context/auth-context'

export default function Main() {
    const [active, setActive] = useState(false)
    const { room, setRoom } = useContext(roomContext)
    const authState = useAuthState()
    const [roomData, setRoomData] = useState({
        id: null,
        name: null,
        image: null,
        hasCall: false,
        type: null,
        input: true,
        callee: null,
        // hasAccess: true,
    })

    const { getReq } = useRequest()
    useEffect(() => {
        if (room.id) {
            switch (room.type) {
                case roomTypes.CONTACT:
                    getReq(`private/${room.id}/`).then(({ data, status }) => {
                        setRoomData({
                            id: data.id,
                            name: (data.owner.id === authState.user ? data.user.username : data.owner.username),
                            image: (data.owner.id === authState.user ? data.user.image : data.owner.image),
                            hasCall: true,
                            type: roomTypes.CONTACT,
                            data: data,
                            input: true,
                            callee: (data.owner.id === authState.user ? data.user.id : data.owner.id),
                        })
                        setActive(true)
                    }).catch()
                    break;
                case roomTypes.GROUP:
                    getReq(`group/${room.id}/`).then(({ data, status }) => {
                        setRoomData({
                            id: data.id,
                            name: data.name,
                            image: data.image,
                            hasCall: false,
                            type: roomTypes.GROUP,
                            data: data,
                            input: true,
                            callee: null,
                        })
                        setActive(true)
                    }).catch()
                    break;
                case roomTypes.CHANNEL:
                    getReq(`channel/${room.id}/`).then(({ data, status }) => {
                        setRoomData({
                            id: data.id,
                            name: data.name,
                            image: data.image,
                            hasCall: false,
                            type: roomTypes.CHANNEL,
                            data: data,
                            input: (data.creator === authState.user) ? true : false,
                            callee: null,
                        })
                        setActive(true)
                    }).catch()
                    break;
                default:
                // throw Error('room type not supported')
            }
        }
    }, [room, authState])
    return (
        <main className={"main " + (active && 'active')}>
            {room.id &&
                <>
                    <Header roomData={roomData} setActive={setActive} />
                    <Chats roomData={roomData} />
                </>
            }
        </main>
    )
}
