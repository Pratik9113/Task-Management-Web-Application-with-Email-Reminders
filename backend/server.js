import express from "express"
import { connectDB } from "./config/db.js";
const app = express();
const port = 4000
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    res.send("working");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})