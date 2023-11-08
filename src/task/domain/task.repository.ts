import { HasTaskId, Task } from './task.domain';

export class TaskRepository {
  save: (user: Task) => Promise<void>;
  findById: (id: string) => Promise<Task | null>;
  findAll: () => Promise<Task[]>;
  findByGameId: (gameId: string) => Promise<Task[]>;
  findTaskByInstanceThatNeedBeAnswered: (instance: HasTaskId) => Promise<Task>;
}
