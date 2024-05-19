import React, { useContext, useState } from 'react'
import './Add.css'
import axios from "axios"
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'
const Add = () => {
    const { url } = useContext(StoreContext);
    const [data, setData] = useState({
        title: "",
        description: "",
        deadline: "",
        // email: "",
    })
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // if (!data.title || !data.description || !data.deadline) {
        //     toast.error("Please fill in all required fields.");
        //     return;
        // }
        // const formData = new FormData();
        // formData.append("title", data.title)
        // formData.append("description", data.description)
        // formData.append("deadline", data.deadline)
        // // formData.append("email", data.email)
        let newwUrl = url;
        newwUrl += "/api/task/add"
        const res = await axios.post(newwUrl, data);
        // if (res.data.success) {
        //     setToken(res.data.token);
        //     localStorage.setItem("token", res.data.token)
        //     setShowLogin(false);
        // } else {
        //     alert(res.data.error);
        // }
        if (res.data.success) {
            setData({
                title: "",
                description: "",
                deadline: "",
                // email: "",
            });
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message)
        }
    }

    return (
        <>
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
                        {/* <div className='add-email'>
                            <p>user email </p>
                            <input onChange={onChangeHandler} value={data.email} type="email" name="email" placeholder='type your email' />
                        </div> */}
                        <button> ADD  </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Add
