import express from "express";
import { addTask ,listItem} from "../controllers/addControllers.js";
import authMiddleware from '../middleware/auth.js'
const taskRouter = express.Router();

taskRouter.post("/add",authMiddleware, addTask);
taskRouter.post("/list",authMiddleware,listItem);
export default taskRouter;