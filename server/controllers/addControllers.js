import addModel from "../models/addmodel.js";
import mongoose from 'mongoose';
import userModel from "../models/userModules.js";
const { ObjectId } = mongoose.Types;

const addTask = async(req,res) =>{
    const { title, description, deadline, time } = req.body;
    const {userId} = req.user;
    if (!title || !description || !deadline || !time) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        const newTask = new addModel({
            userId,
            title,
            description,
            deadline,
            time
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

const pendingList = async (req, res) => {
    const { userId } = req.user;
    const now = new Date();
    const currDate = now.toISOString().split('T')[0]
    // const oneDayAgo = new Date(now);
    // oneDayAgo.setDate(now.getDate() - 1);

    try {
    
        const crossedDeadlineTasks = await addModel.find({
            userId,
            deadline: { $lt: currDate}
        });

        return res.json({ success: true, data: crossedDeadlineTasks });
    } catch (error) {
        console.log("Error in fetching tasks that crossed the deadline:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getNextSevenDaysTasks = async (req, res) => {
    const { userId } = req.user;
    const today = new Date();
    const nextSevenDays = new Date(today);
    nextSevenDays.setDate(today.getDate() + 7);
    try {
        const tasks = await addModel.find({
            userId,
            deadline: {
                $gte: today.toISOString().split('T')[0],
                $lte: nextSevenDays.toISOString().split('T')[0]
            }
        });
        return res.json({ success: true, data: tasks });
    } catch (error) {
        console.log("Error in fetching next 7 days tasks:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateItem = async(req,res) =>{
    const {taskId} = req.params;
    const {userId} = req.user;
    const {title,description,deadline,time}  = req.body;
    try {
        const updatedItem = await addModel.findOneAndUpdate(
            { _id: taskId, userId: userId },
            { title, description, deadline ,time}, 
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
export {addTask,listItem, removeItem , updateItem , pendingList,getNextSevenDaysTasks};
