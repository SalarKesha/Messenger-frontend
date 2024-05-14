import React, { useEffect, useState, useMemo, } from 'react'
import { useRequest } from '../../Requests/requests'
import ContactItem from './ContactItem/ContactItem'


export default function Contacts() {
    const { getReq } = useRequest()
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        const fetchData = () => {
            getReq('private/list/').then(({ data }) => {
                setContacts(data)
            }).catch()
        }
        fetchData()
    }, [])
    return (
        <ul className="items">
            {contacts ? contacts.map(contact => <ContactItem key={contact.id} contact={contact} />) : ''}
        </ul>
    )
}

