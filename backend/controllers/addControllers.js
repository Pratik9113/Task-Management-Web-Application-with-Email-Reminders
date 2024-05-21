import addModel from "../models/addmodel.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const addTask = async(req,res) =>{
    const { title, description, deadline } = req.body;
    const {userId} = req.user;
    if (!title || !description || !deadline) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        const newTask = new addModel({
            userId,
            title,
            description,
            deadline
        });
        const saved = await newTask.save();
        return res.status(200).json({ success: true, message: "Task added successfully", data: saved });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const listItem = async (req, res) => {
    const { userId } = req.user;
    try {
        const tasks = await addModel.find({ userId });
        return res.json({ success: true, data: tasks });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching tasks" });
    }
};

const removeItem = async (req, res) => {
    const { taskId } = req.params;
    const { userId } = req.user;
    try {
        const task = await addModel.findByIdAndDelete(taskId);
        if (task) {
            console.log("Task deleted successfully:", taskId);
            return res.json({ success: true, message: "Deleted successfully" });
        } else {
            console.error("Task not found or unauthorized:", taskId);
            return res.json({ success: false, message: "Task not found or unauthorized" });
        }
    } catch (error) {
        console.log("Error in removeItem:", error);
        return res.status(500).json({ success: false, message: "Unsuccessful" });
    }
};


const updateItem = async(req,res) =>{
    const {taskId} = req.params;
    const {userId} = req.user;
    const {title,description,deadline}  = req.body;
    try {
        const updatedItem = await addModel.findOneAndUpdate(
            { _id: taskId, userId: userId },
            { title, description, deadline }, 
            { new: true }
        );
        if(updatedItem){
            console.log("task successfuly updated " , taskId);
            return res.json({success:true, message : "update successfully "})
        }else {
            console.error("Task not update or unauthorized:", taskId);
            return res.json({ success: false, message: "Task not update or unauthorized" });
        }
    } catch (error) {
        console.log("Error in update Item :", error);
        return res.status(500).json({ success: false, message: "Unsuccessful" });
    }

}
export {addTask,listItem, removeItem , updateItem};
