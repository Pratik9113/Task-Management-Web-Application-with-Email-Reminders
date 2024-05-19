import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
const List = () => {
    const [list, setList] = useState([]);
    const { url } = useContext(StoreContext);
    // const url = "http://localhost:4000";
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/task/list`)
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
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

                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <p>{item.title}</p>
                            <p>{item.description} </p>
                            <p>{item.deadline}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
