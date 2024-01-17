import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { TaskInstance, TaskInstanceDomain } from './task-instance.domain';

interface CreateTaskInstance {
  id: string;
  taskId: string;
  gameInstanceId: string;
  order: number;
}

@Injectable()
export class TaskInstanceFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTaskInstance): TaskInstance {
    return this.reconstitute({
      id: options.id,
      gameInstanceId: options.gameInstanceId,
      taskId: options.taskId,
      order: options.order,
      startedAt: null,
      status: 'Created',
      createdAt: new Date(),
      answeredBy: null,
      answeredAt: null,
      helpStatus: 0,
    });
  }

  reconstitute(options: Partial<TaskInstanceDomain>): TaskInstance {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new TaskInstanceDomain(), {
        ...options,
        updatedAt: new Date(),
      }),
    );
  }
}
