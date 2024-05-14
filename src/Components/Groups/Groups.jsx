import React, { useEffect, useState } from 'react'
import GroupItem from './GroupItem/GroupItem';
import { useRequest } from '../../Requests/requests';
import GroupPopup from './GroupPopup/GroupPopup';

export default function Groups() {
	const { getReq } = useRequest()
	const [groups, setGroups] = useState([])
	const [popup, setPopup] = useState(false)
	const handlePopup = (value) => {
		setPopup(value)
	}
	useEffect(() => {
		const fetchData = () => {
			getReq('group/member/list/').then(({ data, status }) => {
				setGroups(data)
			}).catch()
		}
		if (!popup) {
			fetchData()
		}
	}, [popup])
	return (
		<ul className="items">
			{groups ? groups.map(groupMember => <GroupItem key={groupMember.id} groupMember={groupMember} />) : ''}
			<button className="add-button" onClick={() => handlePopup(true)}>
				<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m12 4v16" /><path d="m4 12h16" /></g></svg>
			</button>
			{popup &&
				<GroupPopup handlePopup={handlePopup} />}
		</ul>
	)
}
