export interface Task {
  task_id: number;
  title: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface CreateTaskDTO {
  title: string;
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
  status?: boolean;
}
