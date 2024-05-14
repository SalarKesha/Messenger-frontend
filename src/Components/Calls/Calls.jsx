import React, { useEffect, useState } from 'react'
import CallItem from './CallItem/CallItem'
import { useRequest } from '../../Requests/requests'
export default function Calls() {
    const { getReq } = useRequest()
    const [calls, setCalls] = useState()
    useEffect(() => {
        const fetchData = () => {
            getReq('call/list/').then(({ data, status }) => {
                setCalls(data)
            })
        }
        fetchData()
    }, [])
    return (
        <ul className="items">
            {calls ? calls.map(call => <CallItem key={call.id} call={call} />) : ''}
        </ul>
    )
}
