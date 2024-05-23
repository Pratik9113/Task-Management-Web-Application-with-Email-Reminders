import express from "express"
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import 'dotenv/config'
import startCron from "./node-cron.js";
const app = express();
const port =  4000;
const allowedOrigins = [
    'http://localhost:5173',
    'https://task-management-web-application-with-email-reminders-lm64.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions))
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

