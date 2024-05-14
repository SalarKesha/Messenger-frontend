import React from 'react'
import '../../assets/styles/general.css'
export default function Layout({ children }) {
    return (
        <div className="main-container">
            {children}
        </div>
    )
}
