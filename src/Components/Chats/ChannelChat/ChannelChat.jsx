import React, { useState, useEffect, useRef } from 'react'
import { useRequest } from '../../../Requests/requests'
import { useAuthState } from '../../../Context/auth-context'
import { getSocketReq } from '../../../Requests/requests'
import { roomTypes } from '../../../Pages/Messenger/Messenger'
export default function ChannelChat({ roomData, message, handleSendMessage }) {
	const authState = useAuthState()
	const { getReq } = useRequest()
	const [chats, setChats] = useState([])
	const socketRef = useRef(null)
	useEffect(() => {
		getReq(`channel/${roomData.id}/message/list/`).then(({ data, status }) => {
			setChats(data)
		}).catch()
	}, [roomData])
	useEffect(() => {
		if (roomData.type === roomTypes.CHANNEL) {
			socketRef.current = new WebSocket(getSocketReq(`channel/${roomData.id}/`))
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
			return () => {
				socketRef.current.close()
				socketRef.current = null
			}
		}
	}, [roomData])
	useEffect(() => {
		if (message && socketRef) {
			socketRef.current.send(JSON.stringify({ 'text': message }))
			handleSendMessage('')
		}
	}, [message])

	const chatMessages = chats && chats.map(chat => {
		return (
			<li key={chat.id} className={'receive'}>
				<div className='text-wrapper'>
					<p>{chat.content}</p>
					<div className="detail"><span className="time">{chat.created_time}</span></div>
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
