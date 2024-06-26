import React, { useContext, useEffect, useState } from 'react'
import Profile from '../Profile'
import { useRequest } from '../../Requests/requests'
import Contacts from '../Contacts/Contacts'
import { userContext } from '../../Pages/Messenger/Messenger'
import Groups from '../Groups/Groups'
import Channels from '../Channels'
import Calls from '../Calls/Calls'
import Explore from '../Explore/Explore'
const Menu = {
    profile: 'profile',
    contacts: 'contacts',
    groups: 'group',
    channels: 'channel',
    calls: 'call',
    explore: 'explore'
}
function getActiveMenu(menu) {
    switch (menu) {
        case Menu.profile:
            return <Profile />
        case Menu.contacts:
            return <Contacts />
        case Menu.groups:
            return <Groups />
        case Menu.channels:
            return <Channels />
        case Menu.calls:
            return <Calls />
        case Menu.explore:
            return <Explore />
        default:
            return <Contacts />
    }
}
export default function Aside() {
    const { user, setUser } = useContext(userContext)
    const [menu, setMenu] = useState(Menu.contacts)
    const { getReq, postReq, deleteReq } = useRequest()
    const handleMenuStatus = (menuStatus) => {
        setMenu(menuStatus)
    }
    const activeMenu = getActiveMenu(menu)
    return (
        <aside className="aside">
            <section className="menu-section">
                <ul>
                    <li className={menu === Menu.profile && 'active'} onClick={() => handleMenuStatus(Menu.profile)}>
                        <img src={user.image} alt="Me" />
                        <span>Me</span>
                    </li>
                    <li className={menu === Menu.contacts && 'active'} onClick={() => handleMenuStatus(Menu.contacts)}>
                        <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m192 256c61.9 0 112-50.1 112-112s-50.1-112-112-112-112 50.1-112 112 50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3c-63.6 0-115.2 51.6-115.2 115.2v28.8c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm211.2-32c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8h-3.8c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4h176.6c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" />
                        </svg>
                        <span>Contacts</span>
                    </li>
                    <li className={menu === Menu.groups && 'active'} onClick={() => handleMenuStatus(Menu.groups)}>
                        <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112s-50.1-112-112-112-112 50.1-112 112 50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3c-63.6 0-115.2 51.6-115.2 115.2v28.8c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4c-11.6-11.5-27.5-18.6-45.1-18.6h-64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                        </svg>
                        <span>Groups</span>
                    </li>
                    <li className={menu === Menu.channels && 'active'} onClick={() => handleMenuStatus(Menu.channels)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48">
                            <path
                                d="M43.167 20.167a3.817 3.817 0 0 0-3.3 1.916h-6.061a9.946 9.946 0 0 0-3.56-5.835l3.494-6.639a3.838 3.838 0 1 0-3.394-1.781l-3.492 6.636A9.874 9.874 0 0 0 24 14a9.881 9.881 0 0 0-2.855.464l-3.492-6.636a3.831 3.831 0 1 0-3.394 1.781l3.5 6.639a9.947 9.947 0 0 0-3.561 5.835H8.134a3.833 3.833 0 1 0 0 3.834h6.059a9.947 9.947 0 0 0 3.561 5.835l-3.5 6.639a3.841 3.841 0 1 0 3.394 1.781l3.492-6.636A9.881 9.881 0 0 0 24 34a9.874 9.874 0 0 0 2.854-.464l3.492 6.636a3.832 3.832 0 1 0 3.394-1.781l-3.494-6.639a9.946 9.946 0 0 0 3.56-5.835h6.059a3.827 3.827 0 1 0 3.3-5.75ZM24 30.1a6.1 6.1 0 1 1 6.1-6.1 6.1 6.1 0 0 1-6.1 6.1Z" />
                        </svg>
                        <span>Channels</span>
                    </li>
                    <li className={menu === Menu.calls && 'active'} onClick={() => handleMenuStatus(Menu.calls)}>
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m497.39 361.8-112-48a24 24 0 0 0 -28 6.9l-49.6 60.6a370.66 370.66 0 0 1 -177.19-177.19l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112a24.16 24.16 0 0 0 -27.5-13.9l-104 24a24 24 0 0 0 -18.6 23.39c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0 -14.01-27.6z" />
                        </svg>
                        <span>Calls</span>
                    </li>
                    <li className={menu === Menu.explore && 'active'} onClick={() => handleMenuStatus(Menu.explore)}>
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m414.39 97.74a224 224 0 1 0 -316.78 316.78 224 224 0 1 0 316.78-316.78zm-350.39 158.39a191.63 191.63 0 0 1 6.7-50.31c7.34 15.8 18 29.45 25.25 45.66 9.37 20.84 34.53 15.06 45.64 33.32 9.86 16.21-.67 36.71 6.71 53.67 5.36 12.31 18 15 26.72 24 8.91 9.08 8.72 21.52 10.08 33.36a305.36 305.36 0 0 0 7.45 41.27c0 .1 0 .21.08.31-74.83-26.28-128.63-97.61-128.63-181.28zm192 192a193.12 193.12 0 0 1 -32-2.68c.11-2.71.16-5.24.43-7 2.43-15.9 10.39-31.45 21.13-43.35 10.61-11.74 25.15-19.68 34.11-33 8.78-13 11.41-30.5 7.79-45.69-5.33-22.44-35.82-29.93-52.26-42.1-9.45-7-17.86-17.82-30.27-18.7-5.72-.4-10.51.83-16.18-.63-5.2-1.35-9.28-4.15-14.82-3.42-10.35 1.36-16.88 12.42-28 10.92-10.55-1.41-21.42-13.76-23.82-23.81-3.08-12.92 7.14-17.11 18.09-18.26 4.57-.48 9.7-1 14.09.68 5.78 2.14 8.51 7.8 13.7 10.66 9.73 5.34 11.7-3.19 10.21-11.83-2.23-12.94-4.83-18.21 6.71-27.12 8-6.14 14.84-10.58 13.56-21.61-.76-6.48-4.31-9.41-1-15.86 2.51-4.91 9.4-9.34 13.89-12.27 11.59-7.56 49.65-7 34.1-28.16-4.57-6.21-13-17.31-21-18.83-10-1.89-14.44 9.27-21.41 14.19-7.2 5.09-21.22 10.87-28.43 3-9.7-10.59 6.43-14.06 10-21.46 1.65-3.45 0-8.24-2.78-12.75q5.41-2.28 11-4.23a15.6 15.6 0 0 0 8 3c6.69.44 13-3.18 18.84 1.38 6.48 5 11.15 11.32 19.75 12.88 8.32 1.51 17.13-3.34 19.19-11.86 1.25-5.18 0-10.65-1.2-16a190.83 190.83 0 0 1 105 32.21c-2-.76-4.39-.67-7.34.7-6.07 2.82-14.67 10-15.38 17.12-.81 8.08 11.11 9.22 16.77 9.22 8.5 0 17.11-3.8 14.37-13.62-1.19-4.26-2.81-8.69-5.42-11.37a193.27 193.27 0 0 1 18 14.14c-.09.09-.18.17-.27.27-5.76 6-12.45 10.75-16.39 18.05-2.78 5.14-5.91 7.58-11.54 8.91-3.1.73-6.64 1-9.24 3.08-7.24 5.7-3.12 19.4 3.74 23.51 8.67 5.19 21.53 2.75 28.07-4.66 5.11-5.8 8.12-15.87 17.31-15.86a15.4 15.4 0 0 1 10.82 4.41c3.8 3.94 3.05 7.62 3.86 12.54 1.43 8.74 9.14 4 13.83-.41a192.12 192.12 0 0 1 9.24 18.77c-5.16 7.43-9.26 15.53-21.67 6.87-7.43-5.19-12-12.72-21.33-15.06-8.15-2-16.5.08-24.55 1.47-9.15 1.59-20 2.29-26.94 9.22-6.71 6.68-10.26 15.62-17.4 22.33-13.81 13-19.64 27.19-10.7 45.57 8.6 17.67 26.59 27.26 46 26 19.07-1.27 38.88-12.33 38.33 15.38-.2 9.81 1.85 16.6 4.86 25.71 2.79 8.4 2.6 16.54 3.24 25.21a158 158 0 0 0 4.74 30.07 191.75 191.75 0 0 1 -151.43 74.13z" /></svg>
                        <span>Explore</span>
                    </li>
                </ul>
            </section>
            <section className="item-section">
                {activeMenu}
            </section>
        </aside>
    )
}
