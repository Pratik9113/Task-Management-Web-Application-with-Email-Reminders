import React, { useState } from 'react';
import './UpdateForm.css';
import { assets } from '../../assets/assets';

const UpdateForm = ({ taskId, title, description, deadline, time, onUpdate, setShowUpdateForm }) => {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedDeadline, setUpdatedDeadline] = useState(deadline);
    const [updatedTime, setUpdatedTime] = useState(time);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(taskId, updatedTitle, updatedDescription, updatedDeadline, updatedTime);
    };

    return (
        <div className="update">
            <form onSubmit={handleSubmit} className="update-container">
                <div className="update-title">
                    <label className="update-text">Title:</label>
                    <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                    <img className='update-click' onClick={() => setShowUpdateForm(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="update-input">
                    <label className="update-text">Description:</label>
                    <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
                    <label className="update-text">Deadline:</label>
                    <input type="date" value={updatedDeadline} onChange={(e) => setUpdatedDeadline(e.target.value)} />
                    <label className="update-text">Time:</label>
                    <input type="time" value={updatedTime} onChange={(e) => setUpdatedTime(e.target.value)} />
                </div>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateForm;
