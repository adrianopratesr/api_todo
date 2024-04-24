import { Pool } from "pg";
import { CreateTaskDTO, Task, UpdateTaskDTO } from "../models/taskRepository";
import { UUID } from "crypto";
import { title } from "process";

export class TaskRepository {
  constructor(private db: Pool) {}

  async findAll(): Promise<Task[]> {
    const { rows } = await this.db.query<Task>("SELECT * FROM tasks");
    return rows;
  }
  async create(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "INSERT INTO tasks (task_id, title) VALUES (gen_random_uuid(), $1) RETURNING *",
      [createTaskDto.title]
    );
    return rows[0];
  }
  async findById(taskId: UUID): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "SELECT * FROM tasks WHERE task_id = $1",
      [taskId]
    );
    return rows[0];
  }
  async updateTaskById(taskId: UUID, task: UpdateTaskDTO): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "UPDATE tasks SET title = $1, status = $2,updated_at = now() WHERE task_id = $3 AND DELETED_AT IS NULL RETURNING *",
      [task.title, task.status, taskId]
    );
    return rows[0];
  }
  async deleteTaskById(taskId: UUID): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "UPDATE tasks SET deleted_at = now(), updated_at = now() WHERE task_id = $1 AND DELETED_AT IS NULL RETURNING *",
      [taskId]
    );
    return rows[0];
  }
}
