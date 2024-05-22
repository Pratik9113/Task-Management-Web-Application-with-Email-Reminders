import express from "express"
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import 'dotenv/config'
import startCron from "./node-cron.js";
// import path from "path";
// const __dirname = path.resolve()
const app = express();
const port = 4000
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials : true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
connectDB();


app.use("/api/user" , userRouter)
app.use("/api/task", taskRouter)

// app.use(express.static(path.join(__dirname, '/frontend/dist')));
/* The code `app.get('*',(req,res)=>{ res.sendFile(path.join(__dirname, 'frontend'
,'dist','index.html')) })` is setting up a route handler in the Express application for any GET
request that does not match any other defined routes. */
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'frontend' ,'dist','index.html'))
// })
app.get("/",(req,res)=>{
    res.send("working");
}) 
startCron();
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})