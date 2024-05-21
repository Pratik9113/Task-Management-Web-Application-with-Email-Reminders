import React from 'react'
import { useState } from 'react';
const UpdateForm = ({ taskId, title, description, deadline, onUpdate }) => {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedDeadline, setUpdatedDeadline] = useState(deadline);


    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(taskId, updatedTitle, updatedDescription, updatedDeadline);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />

                <label>Description:</label>
                <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />

                <label>Deadline:</label>
                <input type="text" value={updatedDeadline} onChange={(e) => setUpdatedDeadline(e.target.value)} />

                <button type="submit">Update Task</button>
            </form>
        </>
    )
}

export default UpdateForm
