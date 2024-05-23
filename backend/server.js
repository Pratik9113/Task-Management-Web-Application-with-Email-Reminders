import express from "express"
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import 'dotenv/config'
import startCron from "./node-cron.js";
const app = express();
const port = 4000

app.use(express.json());
app.use(cors({origin: [process.env.CLIENT_URL], credentials: true}))
app.use(cookieParser());
connectDB();


app.use("/api/user" , userRouter)
app.use("/api/task", taskRouter)
app.get("/",(req,res)=>{
    res.send("working");
}) 
startCron();
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})