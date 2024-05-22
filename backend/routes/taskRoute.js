import express from "express";
import { addTask, listItem, pendingList, removeItem, updateItem } from "../controllers/addControllers.js";
import { jwtAuth } from "../middleware/auth.js";
const taskRouter = express.Router();

taskRouter.post("/add",jwtAuth, addTask);
taskRouter.get("/list",jwtAuth,listItem);
taskRouter.get("/pending",jwtAuth,pendingList);
taskRouter.delete("/remove/:taskId", jwtAuth, removeItem);
taskRouter.put("/update/:taskId", jwtAuth, updateItem);
export default taskRouter;