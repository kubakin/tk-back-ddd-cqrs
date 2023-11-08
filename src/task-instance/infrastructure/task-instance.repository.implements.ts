import { TaskInstanceRepository } from '../domain/task-instance.repository';
import { TaskInstanceFactory } from '../domain/task-instance.factory';
import { TaskInstance } from '../domain/task-instance.domain';
import { TaskInstanceEntity } from './task-instance.entity';

const repository: TaskInstanceEntity[] = [];

export class TaskInstanceRepositoryImplements
  implements TaskInstanceRepository
{
  constructor(private factory: TaskInstanceFactory) {}

  async save(team: TaskInstance) {
    repository.push(this.modelToEntity(team));
    console.log(repository);
  }

  async findById(id: string) {
    return this.entityToModel(repository.find((item) => item.id === id));
  }

  async findAll() {
    return repository.map((item) => this.entityToModel(item));
  }

  private entityToModel(data: TaskInstanceEntity): TaskInstance {
    return this.factory.reconstitute(data);
  }

  private modelToEntity(data: any): TaskInstanceEntity {
    return { ...data };
  }
}
