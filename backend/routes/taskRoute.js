import express from "express";
import { addTask, listItem } from "../controllers/addControllers.js";
import { jwtAuth } from "../middleware/auth.js";
const taskRouter = express.Router();

taskRouter.post("/add",jwtAuth, addTask);
taskRouter.get("/list",jwtAuth,listItem);
export default taskRouter;