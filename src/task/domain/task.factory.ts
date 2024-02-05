import { Task, TaskDomain, TeamOptions } from './task.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { getRandomInt } from 'src/common/random-num';
import { ETaskType } from './enum/task.types';
import { QrTaskDomain } from './packages/qr/qr-task.domain';
import { DefaultTaskDomain } from './packages/default/default-task.domain';
import { GeoTaskDomain } from './packages/geo/geo-task.domain';

interface CreateTaskOption {
  id: string;
  description: any;
  answer: any;
  gameId: string;
  cost: number;
  penalty: number;
  name: string;
  type: ETaskType;
}

@Injectable()
export class TaskFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTaskOption): Task {
    return this.reconstitute({
      id: options.id,
      description: options.description,
      defaultOrder: getRandomInt(),
      answer: options.answer,
      gameId: options.gameId,
      cost: options.cost,
      penalty: options.penalty,
      name: options.name,
      type: options.type,
    });
  }

  reconstitute(options: TeamOptions): Task {
    if (options.type === ETaskType.QR)
      return this.mapType(new QrTaskDomain(), options);
    if (options.type === ETaskType.GEO)
      return this.mapType(new GeoTaskDomain(), options);
    if (options.type === ETaskType.DEFAULT)
      return this.mapType(new DefaultTaskDomain(), options);
    return this.mapType(new TaskDomain(), options);
  }

  private mapType(task: TaskDomain, options: TeamOptions) {
    return this.eventPublisher.mergeObjectContext(Object.assign(task, options));
  }
}
