import React, { useEffect, useState } from 'react'
import { useRequest } from '../../Requests/requests'
import { roomTypes } from '../../Pages/Messenger/Messenger'
import ContactChat from './ContactChat'
import GroupChat from './GroupChat'
import ChannelChat from './ChannelChat'
import Bottom from '../Bottom/Bottom'


const activechat = (roomData, message, handleSendMessage) => {
	switch (roomData.type) {
		case roomTypes.CONTACT:
			return <ContactChat roomData={roomData} message={message} handleSendMessage={handleSendMessage} />
		case roomTypes.GROUP:
			return <GroupChat roomData={roomData} message={message} handleSendMessage={handleSendMessage} />
		case roomTypes.CHANNEL:
			return <ChannelChat roomData={roomData} message={message} handleSendMessage={handleSendMessage} />
		default:
			return null
	}
}
export default function Chats({ roomData }) {
	const [message, setMessage] = useState(null)
	const handleSendMessage = (msg) => {
		setMessage(msg)
	}
	return (
		<>
			<section className="chat-section">
				{activechat(roomData, message, handleSendMessage)}
			</section>
			{roomData.input &&
				<Bottom handleSendMessage={handleSendMessage} />}
		</>
	)
}
