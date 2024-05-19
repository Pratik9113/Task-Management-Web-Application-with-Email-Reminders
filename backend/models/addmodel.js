import mongoose from "mongoose";

const addSchema = new mongoose.Schema({
    title :{type:String, required:true},
    description :{type:String, required:true},
    deadline :{type:String, required:true},
    cartData : {type : Object, default : {}}
},{minimize:false})

const addModel = mongoose.models.add ||  mongoose.model("add",addSchema)

export default addModel;