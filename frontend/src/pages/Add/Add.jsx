
import React, { useContext, useState } from 'react';
import './Add.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { baseUrl } from '../../Urls';

const Add = () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const [data, setData] = useState({
        title: "",
        description: "",
        deadline: "",
        time: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }

    const formatDate = (date) => {
        return date; // Since date input of type "date" will provide the date in YYYY-MM-DD format
    }
    const formatTime = (time) => {
        return time;
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formattedData = {
            ...data,
            deadline: formatDate(data.deadline),
            time: formatTime(data.time)
        };

        const newUrl = `${baseUrl}/api/task/add`;

        try {
            const response = await axios.post(newUrl, formattedData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setData({
                    title: "",
                    description: "",
                    deadline: "",
                    time: ""
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while adding the task.');
        }
    }

    return (
        <div className="app">
            <div className="add-container">
                <div className="add-todoimg">
                    <img src={assets.todoitem} alt="" />
                </div>
                <div className="add-form">
                    <form onSubmit={onSubmitHandler}>
                        <div className='add-title'>
                            <p>Title</p>
                            <input onChange={onChangeHandler} value={data.title} type="text" name="title" placeholder='type here' />
                        </div>
                        <div className='add-description'>
                            <p>Description</p>
                            <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='write content here'></textarea>
                        </div>
                        <div className='add-deadline'>
                            <p>Deadline</p>
                            <input onChange={onChangeHandler} value={data.deadline} type="date" name="deadline" />
                        </div>
                        <div className='add-time'>
                            <p>Time</p>
                            <input onChange={onChangeHandler} value={data.time} type="time" name="time" />
                        </div>
                        <button type="submit">ADD</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;
