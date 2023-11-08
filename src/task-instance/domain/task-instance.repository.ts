import { TaskInstance } from './task-instance.domain';

export class TaskInstanceRepository {
  save: (user: TaskInstance) => Promise<void>;
  findById: (id: string) => Promise<TaskInstance | null>;
  // findAll: () => Promise<GameTask[]>;
}
