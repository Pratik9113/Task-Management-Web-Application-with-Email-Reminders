import React from 'react'
import { assets } from '../../assets/assets'
import './Listitem.css'

const Listitem = ({ id, title, description, deadline, time, removeTodo, handleUpdateClick }) => {
    return (
        <div className="list-table-table">
            <div className="todo-item-info">
                <div className="todo-item-title">
                    <p className='todo-item-title-text'>Title :</p>
                    <p className='todo-item-content'>{title}</p>
                </div>
                <div className="todo-item-desc">
                    <p className="todo-item-desc-text">Description:</p>
                    <p className='todo-item-content adjust-width'>{description}</p>
                </div>
                <div className="todo-item-deadline">
                    <p className="todo-item-deadline-text">Deadline :</p>
                    <p className='todo-item-content'>{deadline}</p>
                </div>
                <div className="todo-item-time">
                    <p className="todo-item-time-text">Time :</p>
                    <p className='todo-item-content'>{time}</p>
                </div>
            </div>
            <div className="todo-item-button">
                <div className="todo-item-delete">
                    <img onClick={() => removeTodo(id)} src={assets.deleteicon} alt="" />
                </div>
                <div className="todo-item-update">
                    <button onClick={() => handleUpdateClick(id, title, description, deadline, time)}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Listitem
