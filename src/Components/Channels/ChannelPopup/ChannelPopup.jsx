import React, { useContext, useState, useRef } from 'react'
import { notify, useRequest } from '../../../Requests/requests'
import { roomContext, roomTypes } from '../../../Pages/Messenger/Messenger'

export default function ChannelPopup({ handlePopup }) {
    const { room, setRoom } = useContext(roomContext)
    const { postReq } = useRequest()
    const [nameInput, setNameInput] = useState('')
    const [imageSelected, setImageSelected] = useState(false)
    const imageRef = useRef()
    const handleContainerClick = (e) => {
        e.stopPropagation()
    }
    const handleNameInput = (e) => {
        setNameInput(e.target.value)
    }

    const handleImageSelect = (e) => {
        e.target.files.length ? setImageSelected(true) : setImageSelected(false)
    }
    const createNewChannel = () => {
        if (imageRef.current.files[0] && nameInput) {
            const file = imageRef.current.files[0];
            const formData = new FormData();
            formData.append('image', file);
            formData.append('name', nameInput);
            console.log('mode 1');
            postReq('channel/create/', formData).then(({ data, status }) => {
                notify('Channel created successfully', 'success')
                setRoom(state => {
                    return {
                        id: data.id,
                        type: roomTypes.CHANNEL
                    }
                })
            }).catch(error => {
                console.log(error)
                notify('Something went wrong', 'error')
            }).finally(() => { handlePopup(false) })
        } else if (nameInput) {
            console.log('mode 1');
            postReq('channel/create/', { name: nameInput }).then(({ data, status }) => {
                notify('Channel created successfully', 'success')
                setRoom(state => {
                    return {
                        id: data.id,
                        type: roomTypes.CHANNEL
                    }
                })
            }).catch(error => {
                console.log(error)
                notify('Something went wrong', 'error')
            }).finally(() => { handlePopup(false) })
        } else {
            notify('Please fill the channel name')
        }
    }
    return (
        <div className='group-popup-overlay  popup-overlay' onClick={() => handlePopup(false)}>
            <div className='popup-container' onClick={handleContainerClick}>
                <div className="input-container">
                    <input placeholder='Enter Channel Name' type="text" className="group-name" value={nameInput} onChange={handleNameInput} />
                    <label htmlFor="group-image-input" className='image-upload'>
                        {imageSelected ?
                            <>
                                <span>Selected</span>
                                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m9 13 2 2 4-4m-4.5858-4.58579-1.82841-1.82842c-.37508-.37508-.88378-.58579-1.41422-.58579h-2.17157c-1.10457 0-2 .89543-2 2v11c0 1.1046.89543 2 2 2h14c1.1046 0 2-.8954 2-2v-8c0-1.10457-.8954-2-2-2h-7.1716c-.5304 0-1.0391-.21071-1.4142-.58579z" stroke="#464d57" stroke-linecap="round" stroke-linejoin="round" /></svg>
                            </>
                            :
                            <>
                                <span>Select Channel Image</span>
                                <svg width="20" height="20" fill='#464d57' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" /></svg>
                            </>
                        }
                    </label>
                    <input onChange={handleImageSelect} ref={imageRef} id='group-image-input' type="file" className="group-image" accept=".png, .jpg, .jpeg" />
                </div>
                <div className="button-container">
                    <button className='cancel' onClick={() => handlePopup(false)}>
                        <svg fill="#283d59" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h16v16h-16z" fill="none" /><path d="m14.238 5.762c-1.136-1.136-2.641-1.762-4.238-1.762h-6.172l2.586-2.586-1.414-1.414-5 5 5 5 1.414-1.414-2.586-2.586h6.172c1.063 0 2.066.418 2.824 1.176s1.176 1.761 1.176 2.824-.418 2.066-1.176 2.824-1.761 1.176-2.824 1.176h-4v2h4c1.597 0 3.102-.626 4.238-1.762s1.762-2.641 1.762-4.238-.626-3.102-1.762-4.238z" /></svg>
                        <span>Return</span>
                    </button>
                    <button className='accept' onClick={createNewChannel}>
                        <span>Create New Channel</span>
                        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><g stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="m12 4v16" /><path d="m4 12h16" /></g></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
