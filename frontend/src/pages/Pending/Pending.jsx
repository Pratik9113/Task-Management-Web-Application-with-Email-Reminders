import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Pending = () => {
  const [list, setList] = useState([]);
  const { url } = useContext(StoreContext);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/task/pending`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  return (
    <div>
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
    </div>
  )
}

export default Pending
