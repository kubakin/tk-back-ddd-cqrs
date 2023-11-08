import { TaskRepository } from '../domain/task.repository';
import { TaskFactory } from '../domain/task.factory';
import { HasTaskId, Task } from '../domain/task.domain';
import { TaskEntity } from './task.entity';

const repository: TaskEntity[] = [
  {
    id: '1',
    text: 'Team 1',
    defaultOrder: 1,
    forceAnswer: true,
  },
];

export class TaskRepositoryImplements implements TaskRepository {
  constructor(private teamFactory: TaskFactory) {}

  async save(team: Task) {
    repository.push(this.modelToEntity(team));
    console.log(repository);
  }

  async findById(id: string) {
    return this.entityToModel(repository.find((item) => item.id === id));
  }

  async findByTaskInstance(taskInstance: HasTaskId) {
    return '' as any;
  }

  async findTaskByInstanceThatNeedBeAnswered(instance: HasTaskId) {
    return '' as any;
  }

  async findAll() {
    return repository.map((item) => this.entityToModel(item));
  }

  async findByGameId(gameId: string) {
    return repository.map((item) => this.entityToModel(item));
  }

  private entityToModel(data: TaskEntity): Task {
    return this.teamFactory.reconstitute(data);
  }

  private modelToEntity(data: any): TaskEntity {
    return { ...data };
  }
}
