import React, { useEffect, useState } from 'react'
import ChannelItem from './ChannelItem/ChannelItem';
import { useRequest } from '../../Requests/requests';
import ChannelPopup from './ChannelPopup/ChannelPopup';
export default function Channels() {
    const { getReq } = useRequest()
    const [popup, setPopup] = useState(false)
    const [channels, setChannels] = useState([])
    useEffect(() => {
        const fetchDate = () => {
            getReq('channel/member/list/').then(({ data, status }) => {
                setChannels(data)
            }).catch()
        }
        if (!popup) {
            fetchDate()
        }
    }, [popup])
    const handlePopup = (value) => {
        setPopup(value)
    }
    return (
        <ul className="items">
            {channels ? channels.map(channelMember => <ChannelItem key={channelMember.id} channelMember={channelMember} />) : ''}
            <button className="add-button" onClick={() => handlePopup(true)}>
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m12 4v16" /><path d="m4 12h16" /></g></svg>
            </button>
            {popup &&
                <ChannelPopup handlePopup={handlePopup} />}
        </ul>
    )
}
