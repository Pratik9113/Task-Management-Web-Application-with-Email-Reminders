import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option">
                    <img src={assets.addtodo} alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="sidebar-option">
                    <img src={assets.List} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/pending' className="sidebar-option">
                    <img src={assets.pending} alt="" />
                    <p>Pending</p>
                </NavLink>
                <NavLink to='/next' className="sidebar-option">
                    <img src={assets.thisWeek} alt="" />
                    <p>This Week</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
