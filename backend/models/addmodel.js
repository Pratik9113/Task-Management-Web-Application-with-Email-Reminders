import mongoose from "mongoose";

const addSchema = new mongoose.Schema({
    userId:{type:String},
    title :{type:String, required:true},
    description :{type:String, required:true},
    deadline :{
        type:String, 
        required:true,
        validate : {
            validator : function(value){
                return /^\d{4}-\d{2}-\d{2}$/.test(value);
            }
        }
    },
    time: {type:String,required : true},
    reminderSent: { type: Boolean, default: false }
},{timestamps:true})

const addModel =  mongoose.model("add",addSchema)

export default addModel;