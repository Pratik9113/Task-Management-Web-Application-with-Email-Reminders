import addModel from "../models/addmodel.js";
const addTask = async(req,res) =>{
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const task = new addModel({
        title,
        description,
        deadline,
    });
    try {
        await task.save();
        res.json({success:true, message : "taskadded"})
    } catch (error) {
        console.log(error)
        res.json({success : false,message:"error"})
    }
}

const listTask = async(req,res)=> {
    const {userId} = req.params;
    try {
        const task = await addModel.find({userId})
        res.json({success:true,data :task});
    } catch (error) {
        console.log(error)
        res.json({success : false,message:"error"})
    }
}

export {addTask,listTask}