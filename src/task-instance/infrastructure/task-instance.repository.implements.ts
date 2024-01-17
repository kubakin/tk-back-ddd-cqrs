import { TaskInstanceRepository } from '../domain/task-instance.repository';
import { TaskInstanceFactory } from '../domain/task-instance.factory';
import { TaskInstance } from '../domain/task-instance.domain';
import { TaskInstanceEntity } from './task-instance.entity';
import { writeConnection } from '../../../lib/db.module';
import { Injectable } from '@nestjs/common';

const repository: TaskInstanceEntity[] = [];

@Injectable()
export class TaskInstanceRepositoryImplements
  implements TaskInstanceRepository
{
  constructor(private factory: TaskInstanceFactory) {}

  async save(team: TaskInstance) {
    const models = [team];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  async delete(team: TaskInstance) {
    const models = [team];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.remove(entities);
  }

  async findOneForDistribute(gameInstanceId: string) {
    const entity = await this.repository.findOne({
      where: { gameInstanceId, status: 'Created' },
    });
    return this.entityToModel(entity);
  }

  async findAll() {
    const entities = await this.repository.find();
    return entities.map((it) => this.entityToModel(it));
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    return this.entityToModel(entity);
  }

  private entityToModel(data: TaskInstanceEntity): TaskInstance {
    if (!data) return null;
    return this.factory.reconstitute(data);
  }

  private modelToEntity(data: any): TaskInstanceEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(TaskInstanceEntity);
  }
}
