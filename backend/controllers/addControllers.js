import addModel from "../models/addmodel.js";

const addTask = async(req,res) =>{
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newTask = new addModel({
        userId : req.user.id,
        title : req.body.title,
        description : req.body.description,
        deadline : req.body.deadline
    });
    try {
        const saved = await newTask.save();
        res.status(200).json({ success: true, message: "Task added successfully", data: saved });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const listItem = async(req,res) =>{
    const userId  = req.user.id
    try {
        const task = await addModel.find({userId});
        res.json({success:true,data:task})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }

}


export {addTask,listItem};
