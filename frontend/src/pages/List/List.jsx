import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import UpdateForm from '../../components/UpdateForm/UpdateForm';
const List = () => {
    const [list, setList] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const { url } = useContext(StoreContext);
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/task/list`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    }

    const removeTodo = async (taskId) => {
        try {
            const response = await axios.delete(`${url}/api/task/remove/${taskId}`, {
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


    const handleUpdateClick = (taskId, title, description, deadline) => {
        setSelectedTask({ taskId, title, description, deadline });
        setShowUpdateForm(true);
    }


    const handleUpdateSubmit = async (taskId, title, description, deadline) => {
        try {
            const response = await axios.put(`${url}/api/task/update/${taskId}`,
                { title, description, deadline }, {
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
    }
    useEffect(() => {
        fetchList();
    }, []);
    return (
        <div className="list add flex-col">
            <p>task </p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Title</b>
                    <b>description</b>
                    <b>deadline</b>
                    <b>Delete</b>

                </div>
                {list.length > 0 && list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>{item.deadline}</p>
                        <p><img onClick={() => removeTodo(item._id)} src={assets.deleteicon} alt="" /></p>
                        <button className='list-button' onClick={() => handleUpdateClick(item._id, item.title, item.description, item.deadline)}>Update</button>
                    </div>
                ))}

            </div>
            {showUpdateForm && selectedTask && (
                < UpdateForm
                    taskId={selectedTask.taskId}
                    title={selectedTask.title}
                    description={selectedTask.description}
                    deadline={selectedTask.deadline}
                    onUpdate={handleUpdateSubmit}
                />
            )}
        </div>
    )
}

export default List

