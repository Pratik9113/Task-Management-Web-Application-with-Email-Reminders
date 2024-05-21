import React, { useContext, useState } from 'react';
import './Add.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Add = () => {
    const { url } = useContext(StoreContext);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const [data, setData] = useState({
        title: "",
        description: "",
        deadline: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        let newUrl = url + "/api/task/add";

        try {
            const response = await axios.post(newUrl, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setData({
                    title: "",
                    description: "",
                    deadline: ""
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
        <div className="add">
            <form onSubmit={onSubmitHandler}>
                <div className='add-container'>
                    <div className='add-title'>
                        <p>Title </p>
                        <input onChange={onChangeHandler} value={data.title} type="text" name="title" placeholder='type here' />
                    </div>
                    <div className='add-description'>
                        <p>Description</p>
                        <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='write content here'></textarea>
                    </div>
                    <div className='add-deadline'>
                        <p>Deadline</p>
                        <input onChange={onChangeHandler} value={data.deadline} type="text" name="deadline" placeholder='deadline' />
                    </div>
                    <button> ADD  </button>
                </div>
            </form>
        </div>
    );
}

export default Add;
