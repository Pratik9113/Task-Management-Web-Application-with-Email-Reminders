import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option">
                    <img src="data:image/png;base64,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" alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="sidebar-option">
                    <img src="data:image/png;base64,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" alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/update' className="sidebar-option">
                    <img src="data:image/png;base64,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" alt="" />
                    <p>update</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
