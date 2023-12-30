import { TaskRepository } from '../domain/task.repository';
import { TaskFactory } from '../domain/task.factory';
import { HasTaskId, Task } from '../domain/task.domain';
import { TaskEntity } from './task.entity';
import { Injectable } from '@nestjs/common';
import { writeConnection } from '../../../lib/db.module';

// const repository: TaskEntity[] = [
//   {
//     id: '1',
//     text: 'Team 1',
//     defaultOrder: 1,
//     forceAnswer: true,
//   },
// ];

@Injectable()
export class TaskRepositoryImplements implements TaskRepository {
  constructor(private teamFactory: TaskFactory) {}

  async onApplicationBootstrap() {
    return;
    // const task1: TaskEntity = {
    //   id: "d08cdf5a-e9c9-41af-84fe-4e00b72de657",
    //   gameId: "0faea960-0684-47ae-950d-d5d354950c14",
    //   defaultOrder: 1,
    //   forceAnswer: true,
    //   answer: "answer",
    //   text: "Task 1",
    //   cost: 1,
    //   penalty: 1
    // };
    // const task2: TaskEntity = {
    //   id: "8e45dbef-04a1-433b-93b6-149392059a4c",
    //   gameId: "0faea960-0684-47ae-950d-d5d354950c14",
    //   defaultOrder: 1,
    //   forceAnswer: true,
    //   answer: "answer",
    //   text: "Task 1",
    //   cost: 1,
    //   penalty: 1
    // };
    // const task3: TaskEntity = {
    //   id: "ff82745d-8bdb-4c84-ba7d-602471025cd3",
    //   gameId: "0faea960-0684-47ae-950d-d5d354950c14",
    //   defaultOrder: 1,
    //   forceAnswer: true,
    //   answer: "answer",
    //   text: "Task 1",
    //   cost: 1,
    //   penalty: 1
    // };
    // const tasks = [task1, task2, task3];
    // await this.repository.save(tasks);
  }

  async save(task: Task) {
    const models = [task];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  async delete(task: Task) {
    const models = [task];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.remove(entities);
  }

  async findByGameId(gameId: string) {
    const entities = await this.repository.find({ where: { gameId } });
    return entities.map((it) => this.entityToModel(it));
  }

  async findTaskByInstanceThatNeedBeAnswered(
    instance: HasTaskId,
  ): Promise<Task> {
    return null;
  }

  async findAll() {
    const entities = await this.repository.find();
    return entities.map((it) => this.entityToModel(it));
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    return this.entityToModel(entity);
  }

  private entityToModel(data: TaskEntity): Task {
    return this.teamFactory.reconstitute(data);
  }

  private modelToEntity(data: any): TaskEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(TaskEntity);
  }
}
