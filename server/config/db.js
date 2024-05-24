import mongoose from "mongoose"
export const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.mongo_url}`);
        console.log("db connected");
    } catch (error) {
        console.error("error ", error);
    }
}