import { Router } from "express";
import { TaskHandler } from "../handlers/taskHandler";
import { TaskRepository } from "../repositores/taskRepository";
import db from "../db";

const router = Router();
const taskRepository = new TaskRepository(db);
const taskHandler = new TaskHandler(taskRepository);

router
  .get("/tasks", (req, res) => taskHandler.getAllTasks(req, res))
  .get("/tasks/:id", (req, res) => taskHandler.getTaskById(req, res))
  .patch("/tasks/:id", (req, res) => taskHandler.updatedTask(req, res))
  .delete("/tasks/:id", (req, res) => taskHandler.deleteTask(req, res))
  .post("/tasks", (req, res) => taskHandler.createTask(req, res));

export default router;
