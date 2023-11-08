import { Task, TaskDomain, TeamOptions } from './task.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateTaskOption {
  id: string;
  text: string;
  defaultOrder: number;
  forceAnswer: boolean;
}

@Injectable()
export class TaskFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTaskOption): Task {
    return this.reconstitute({
      id: options.id,
      text: options.text,
      defaultOrder: options.defaultOrder,
      forceAnswer: options.forceAnswer,
    });
  }

  reconstitute(options: TeamOptions): Task {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new TaskDomain(), options),
    );
  }
}
