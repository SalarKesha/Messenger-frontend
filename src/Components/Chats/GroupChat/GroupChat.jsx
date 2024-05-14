import React, { useState, useEffect, useRef } from 'react'
import { useRequest } from '../../../Requests/requests'
import { useAuthState } from '../../../Context/auth-context'
import { getSocketReq } from '../../../Requests/requests'
import { roomTypes } from '../../../Pages/Messenger/Messenger'
export default function GroupChat({ roomData, message, handleSendMessage }) {
	const authState = useAuthState()
	const { getReq } = useRequest()
	const [chats, setChats] = useState([])
	const socketRef = useRef(null)
	useEffect(() => {
		getReq(`group/${roomData.id}/message/list/`).then(({ data, status }) => {
			setChats(data)
		}).catch()
	}, [roomData])
	useEffect(() => {
		if (roomData.type === roomTypes.GROUP) {
			socketRef.current = new WebSocket(getSocketReq(`group/${roomData.id}/`))
			socketRef.current.onopen = () => {
				console.log('socket opened')
			}
			socketRef.current.onmessage = (e) => {
				const data = JSON.parse(e.data)
				setChats((chats) => {
					return [data.message, ...chats]
				})
			}
			socketRef.current.onclose = () => {
				console.log('socket closed')
			}
		}
		return () => {
			socketRef.current.close()
			socketRef.current = null
		}
	}, [roomData])
	useEffect(() => {
		if (message) {
			socketRef.current.send(JSON.stringify({ 'text': message, 'message_type': 1 }))
			handleSendMessage('')
		}
	}, [message])

	const chatMessages = chats && chats.map(chat => {
		return (
			<li key={chat.id} className={chat.sender.user.id === authState.user ? 'send' : 'receive'}>
				{chat.sender.user.id !== authState.user && <img src={chat.sender.user.image} alt="" />}
				<div className='text-wrapper'>
					<div className="username">{chat.sender.user.id !== authState.user && chat.sender.user.username}</div>
					<p>{chat.content}</p>
					<div className="detail"><span className="time">{chat.created_time}</span><span className="seen">
						{chat.sender.user.id === authState.user && '✓✓'}
					</span></div>
				</div>
			</li>
		)
	})

	return (
		<ul className="chats">
			{chatMessages}
		</ul>
	)
}
