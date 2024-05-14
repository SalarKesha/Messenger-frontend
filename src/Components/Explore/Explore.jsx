import React, { useEffect, useState } from 'react'
import { useRequest } from '../../Requests/requests';
import ExploreUser from './ExploreUser';
import ExploreGroup from './ExploreGroup';
import ExploreChannel from './ExploreChannel';
const Modes = {
    USERS: 'users',
    GROUPS: 'groups',
    CHANNELS: 'channels'
}
let cachedExplore;
export default function Explore() {
    const [exploreList, setExploreList] = useState([])
    const { getReq } = useRequest()
    const [mode, setMode] = useState(Modes.USERS)
    const [users, setUsers] = useState([])
    const [groups, setGroups] = useState([])
    const [channels, setChannels] = useState([])
    const handleMode = (mode) => {
        setMode(mode)
    }
    useEffect(() => {
        if (mode === Modes.USERS) {
            getReq('user/explore/').then(({ data, status }) => {
                setUsers(data)
            }).catch()
        } else if (mode === Modes.GROUPS) {
            getReq('group/explore/').then(({ data, status }) => {
                setGroups(data)
            }).catch()
        } else if (mode === Modes.CHANNELS) {
            getReq('channel/explore/').then(({ data, status }) => {
                setChannels(data)
            }).catch()
        }
    }, [mode])
    return (
        <>
            <div className='explore-header'>
                <button className={mode === Modes.USERS && 'active'} onClick={() => handleMode(Modes.USERS)}>
                    <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                            d="m192 256c61.9 0 112-50.1 112-112s-50.1-112-112-112-112 50.1-112 112 50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3c-63.6 0-115.2 51.6-115.2 115.2v28.8c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm211.2-32c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8h-3.8c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4h176.6c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" />
                    </svg>
                    <span>People</span>
                </button>
                <button className={mode === Modes.GROUPS && 'active'} onClick={() => handleMode(Modes.GROUPS)}>
                    <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                            d="m96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112s-50.1-112-112-112-112 50.1-112 112 50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3c-63.6 0-115.2 51.6-115.2 115.2v28.8c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4c-11.6-11.5-27.5-18.6-45.1-18.6h-64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                    </svg>
                    <span>Groups</span>
                </button>
                <button className={mode === Modes.CHANNELS && 'active'} onClick={() => handleMode(Modes.CHANNELS)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 48" width="24">
                        <path
                            d="M43.167 20.167a3.817 3.817 0 0 0-3.3 1.916h-6.061a9.946 9.946 0 0 0-3.56-5.835l3.494-6.639a3.838 3.838 0 1 0-3.394-1.781l-3.492 6.636A9.874 9.874 0 0 0 24 14a9.881 9.881 0 0 0-2.855.464l-3.492-6.636a3.831 3.831 0 1 0-3.394 1.781l3.5 6.639a9.947 9.947 0 0 0-3.561 5.835H8.134a3.833 3.833 0 1 0 0 3.834h6.059a9.947 9.947 0 0 0 3.561 5.835l-3.5 6.639a3.841 3.841 0 1 0 3.394 1.781l3.492-6.636A9.881 9.881 0 0 0 24 34a9.874 9.874 0 0 0 2.854-.464l3.492 6.636a3.832 3.832 0 1 0 3.394-1.781l-3.494-6.639a9.946 9.946 0 0 0 3.56-5.835h6.059a3.827 3.827 0 1 0 3.3-5.75ZM24 30.1a6.1 6.1 0 1 1 6.1-6.1 6.1 6.1 0 0 1-6.1 6.1Z" />
                    </svg>
                    <span>Channels</span>
                </button>
            </div>
            <ul className="items explore-container">
                {mode === Modes.USERS &&
                    users.map(user => <ExploreUser key={user.id} user={user.id} name={user.username} image={user.image} private_chat={user.private_chat} mode={mode} />)}
                {mode === Modes.GROUPS &&
                    groups.map(group => <ExploreGroup key={group.id} group={group.id} name={group.name} image={group.image} mode={mode} joined={group.joined} />)}
                {mode === Modes.CHANNELS &&
                    channels.map(channel => <ExploreChannel key={channel.id} channel={channel.id} name={channel.name} image={channel.image} mode={mode} joined={channel.joined} />)}
            </ul>
        </>
    )
}
