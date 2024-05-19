import express from "express"
import { addTask, listTask } from "../controllers/addControllers.js"

const taskRouter = express.Router();


taskRouter.post("/add",addTask)
taskRouter.get("/list",listTask);


export default taskRouter;