import React, { useContext, useState } from 'react'
import { useAuthDispatch } from '../../Context/auth-context'
import { actionTypes } from '../../Context/reducer'
import { userContext } from '../../Pages/Messenger/Messenger'
import { useRequest } from '../../Requests/requests'
import { notify } from '../../Requests/requests'
export default function Profile() {
    const { patchReq } = useRequest()
    const { user, setUser } = useContext(userContext)
    const authDispatch = useAuthDispatch()
    const [image, setImage] = useState(user.image)
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        authDispatch({
            type: actionTypes.LOGOUT
        })
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setLoading(true)
        patchReq(`user/${user.id}/update/`, formData).then(({ data, status }) => {
            notify('Profile Image Updated', 'success')
            setImage(data.image)
            setUser((user) => {
                return {
                    ...user,
                    image: data.image
                }
            })
        }).catch(() => notify('Something went wrong', 'error')).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className="profile-container">
            <div className="change-image">
                <img src={image} alt="" className="preview" id="preview" />
                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
                {!loading &&
                    <label htmlFor="imageUpload">
                        <svg height="20" viewBox="0 0 16 16" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m13.6568542 2.34314575c.7810486.78104858.7810486 2.04737854 0 2.82842713l-7.38646006 7.38646012c-.32039706.320397-.72184676.547694-1.16142789.6575893l-2.2909993.5727498c-.36619023.0915476-.69788662-.2401488-.60633906-.6063391l.57274982-2.2909992c.10989529-.4395812.33719224-.8410309.6575893-1.16142794l7.38646009-7.38646011c.7810486-.78104858 2.0473786-.78104858 2.8284271 0zm-3.5356101 2.12121356-5.97217031 5.97235329c-.19223823.1922383-.32861641.4331081-.39455358.6968568l-.3706368 1.4825472 1.48254721-.3706368c.26374868-.0659372.5046185-.2023154.69685674-.3945536l5.97195674-5.97256689zm1.4142898-1.41410678-.7072898.70710678 1.414 1.414.7075034-.70689322c.3905243-.39052429.3905243-1.02368927 0-1.41421356s-1.0236893-.39052429-1.4142136 0z" fill="#fff" /></svg>
                    </label>
                }
            </div>
            <h2 className="username">{user.username}</h2>
            <button className="logout" onClick={handleLogout}>
                <span>Log out</span>
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m15.016 7.38964v-.933c0-2.035-1.65-3.685-3.685-3.685h-4.87503c-2.034 0-3.684 1.65-3.684 3.685v11.12996c0 2.035 1.65 3.685 3.684 3.685h4.88503c2.029 0 3.675-1.645 3.675-3.674v-.943" /><path d="m21.8094 12.0215h-12.04097" /><path d="m18.8812 9.10645 2.928 2.91495-2.928 2.916" /></g></svg>
            </button>
        </div>
    )
}
