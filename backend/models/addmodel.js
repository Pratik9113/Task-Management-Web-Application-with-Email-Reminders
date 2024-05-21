import mongoose from "mongoose";

const addSchema = new mongoose.Schema({
    userId:{type:String},
    title :{type:String, required:true},
    description :{type:String, required:true},
    deadline :{type:String, required:true}
},{timestamps:true})

const addModel =  mongoose.model("add",addSchema)

export default addModel;