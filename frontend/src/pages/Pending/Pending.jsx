import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify'; // Added import for toast
import './Pending.css';
import { baseUrl } from '../../Urls';

const Pending = () => {
  const [listo, setListo] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/task/pending`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        setListo(response.data.data);
      } else {
        toast.error("Error fetching tasks");
      }
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
      toast.error("Error fetching pending tasks");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="pending-tasks-container">
        <p className='pending-task'>Here is your pending task </p>
        <div className="pending-table">
          <div className="pending-table-header">
            <b>Title</b>
            <b>Description</b>
            <b>Deadline</b>
            <b>Time</b>
          </div>
          {listo.length > 0 ? (
            listo.map((item, index) => (
              <div key={index} className="pending-table-row">
                <p>{item.title}</p>
                <p className='next-desc'>{item.description}</p>
                <p>{item.deadline}</p>
                <p>{item.time}</p>
              </div>
            ))
          ) : (
            <p>No pending tasks</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Pending;
