import { HasTaskId, Task } from './task.domain';

export class TaskRepository {
  save: (task: Task) => Promise<void>;
  delete: (task: Task) => Promise<void>;
  findById: (id: string) => Promise<Task | null>;
  findAll: () => Promise<Task[]>;
  findByGameId: (gameId: string) => Promise<Task[]>;
  findTaskByInstanceThatNeedBeAnswered: (instance: HasTaskId) => Promise<Task>;
}
