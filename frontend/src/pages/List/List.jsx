import React, { useContext, useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import UpdateForm from '../../components/UpdateForm/UpdateForm';
import { baseUrl } from '../../Urls';
import Listitem from './Listitem';

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
            <p className='list-task-text'>Here is your Task to complete </p>
            <div className="list-items-container">
                {list.length > 0 && list.map((item, index) => (
                    <Listitem key={index} id={item._id} title={item.title} description={item.description} deadline={item.deadline} time={item.time} handleUpdateClick={handleUpdateClick} removeTodo={removeTodo} />
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
