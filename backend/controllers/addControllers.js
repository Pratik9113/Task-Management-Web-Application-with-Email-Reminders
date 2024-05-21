import addModel from "../models/addmodel.js";

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
    const { userId } = req.user; // Assumes userId is set in req.user
    try {
        const tasks = await addModel.findOne({ userId });
        return res.json({ success: true, data: tasks });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching tasks" });
    }
};



export {addTask,listItem};
