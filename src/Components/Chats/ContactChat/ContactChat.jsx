import React, { createRef, useEffect, useRef, useState } from 'react'
import { useRequest } from '../../../Requests/requests'
import { useAuthState } from '../../../Context/auth-context'
import { getSocketReq } from '../../../Requests/requests'
import { roomTypes } from '../../../Pages/Messenger/Messenger'
export default function ContactChat({ roomData, message, handleSendMessage }) {
	const authState = useAuthState()
	const { getReq } = useRequest()
	const [chats, setChats] = useState([])
	const socketRef = useRef(null)

	useEffect(() => {
		getReq(`private/${roomData.id}/message/list/`).then(({ data, status }) => {
			setChats(data)
		}).catch()
	}, [roomData])
	useEffect(() => {
		if (roomData.type === roomTypes.CONTACT) {
			socketRef.current = new WebSocket(getSocketReq(`private/${roomData.id}/`))
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
		if (message && socketRef.current) {
			socketRef.current.send(JSON.stringify({ 'text': message, 'message_type': 1 }))
			handleSendMessage('')
		}
	}, [message])
	const chatMessages = chats && chats.map(chat => {
		return (
			<li key={chat.id} className={chat.sender === authState.user ? 'send' : 'receive'}>
				<div className='text-wrapper'>
					<p>{chat.content}</p>
					<div className="detail"><span className="time">{chat.created_time}</span><span className="seen">
						{chat.sender === authState.user && '✓✓'}
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
