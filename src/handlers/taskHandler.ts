import { Request, Response } from "express";
import { TaskRepository } from "../repositores/taskRepository";
import { UUID } from "crypto";
import { UpdateTaskDTO } from "../models/taskRepository";

export class TaskHandler {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskRepository.findAll();
    res.status(200).json(tasks);
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskRepository.findById(req.params.id as UUID);
    if (!tasks) {
      res.status(404).send("Esta task nao existe");
      return;
    }
    res.status(200).json(tasks);
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const newTask = await this.taskRepository.create(req.body);
    res.status(201).json(newTask);
  }

  async updatedTask(req: Request, res: Response): Promise<void> {
    // await this.getTaskById(req, res);
    const updatedTask = await this.taskRepository.updateTaskById(
      req.params.id as UUID,
      req.body
    );
    res.status(200).json(updatedTask);
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const deletedTask = await this.taskRepository.deleteTaskById(
      req.params.id as UUID
    );
    res.status(200).json(deletedTask);
  }
}
