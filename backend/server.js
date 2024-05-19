import express from "express"
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import 'dotenv/config'
const app = express();
const port = 4000
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();


app.use("/api/user" , userRouter)
app.use("/api/task", taskRouter)
app.get("/",(req,res)=>{
    res.send("working");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})