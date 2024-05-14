import React from 'react'
import { notify, useRequest } from '../../../../Requests/requests'
export default function ExploreChannelPopup({ channel, name, handleJoin, handlePopup }) {
    const { postReq } = useRequest()
    const handleContainerClick = (e) => {
        e.stopPropagation()
    }
    const createNewChannelMember = () => {
        postReq('channel/member/create/', { channel: channel }).then(({ data, status }) => {
            handleJoin(data.channel)
        }).catch(() => {
            notify('Something went wrong', 'error')
        }).finally(() => {
            handlePopup(false)
        })
    }
    return (
        <div className='explore-popup-overlay  popup-overlay' onClick={() => handlePopup(false)}>
            <div className='popup-container' onClick={handleContainerClick}>
                <p className="content">Do you want join to '{name}' channel ?</p>
                <div className="button-container">
                    <button className='cancel' onClick={() => handlePopup(false)}>
                        <svg fill="#283d59" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h16v16h-16z" fill="none" /><path d="m14.238 5.762c-1.136-1.136-2.641-1.762-4.238-1.762h-6.172l2.586-2.586-1.414-1.414-5 5 5 5 1.414-1.414-2.586-2.586h6.172c1.063 0 2.066.418 2.824 1.176s1.176 1.761 1.176 2.824-.418 2.066-1.176 2.824-1.761 1.176-2.824 1.176h-4v2h4c1.597 0 3.102-.626 4.238-1.762s1.762-2.641 1.762-4.238-.626-3.102-1.762-4.238z" /></svg>
                        <span>Return</span>
                    </button>
                    <button className='accept' onClick={createNewChannelMember}>
                        <span>Continue</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 2H4v12H2.5V2zm3.5.18V14l9-5.938-9-5.881zm6.315 5.882L7.5 5v6.18l4.815-3.118z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
