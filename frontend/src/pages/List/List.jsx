import React, { useContext, useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import UpdateForm from '../../components/UpdateForm/UpdateForm';
import { baseUrl } from '../../Urls';

const List = () => {
    const [list, setList] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const fetchList = async () => {
        const response = await axios.get(`${baseUrl}/api/task/list`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    };

    const removeTodo = async (taskId) => {
        try {
            const response = await axios.delete(`${baseUrl}/api/task/remove/${taskId}`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.success) {
                fetchList();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error removing todo:", error);
            toast.error("Error removing todo");
        }
    };

    const handleUpdateClick = (taskId, title, description, deadline, time) => {
        setSelectedTask({ taskId, title, description, deadline, time });
        setShowUpdateForm(true);
    };

    const handleUpdateSubmit = async (taskId, title, description, deadline, time) => {
        try {
            const response = await axios.put(`${baseUrl}/api/task/update/${taskId}`, {
                title, description, deadline, time
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.success) {
                setShowUpdateForm(false);
                fetchList();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Error updating task");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>task</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Title</b>
                    <b>Description</b>
                    <b>Deadline</b>
                    <b>Time</b>
                    <b>Delete</b>
                    <b>Update</b>
                    <b>Done</b>
                </div>
                {list.length > 0 && list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>{item.deadline}</p>
                        <p>{item.time}</p>
                        <p><img onClick={() => removeTodo(item._id)} src={assets.deleteicon} alt="" /></p>
                        <button className='list-button' onClick={() => handleUpdateClick(item._id, item.title, item.description, item.deadline, item.time)}>Update</button>
                        <button className='list-button'>Done</button>
                    </div>
                ))}
            </div>
            {showUpdateForm && selectedTask && (
                <div className="modal">
                    <UpdateForm
                        taskId={selectedTask.taskId}
                        title={selectedTask.title}
                        description={selectedTask.description}
                        deadline={selectedTask.deadline}
                        time={selectedTask.time}
                        onUpdate={handleUpdateSubmit}
                        setShowUpdateForm={setShowUpdateForm}
                    />
                </div>
            )}
        </div>
    );
};

export default List;
