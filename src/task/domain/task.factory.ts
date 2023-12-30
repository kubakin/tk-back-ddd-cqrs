import { Task, TaskDomain, TeamOptions } from './task.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateTaskOption {
  id: string;
  description: any;
  defaultOrder: number;
  answer: any;
  gameId: string;
  cost: number;
  penalty: number;
  name: string;
}

@Injectable()
export class TaskFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTaskOption): Task {
    return this.reconstitute({
      id: options.id,
      description: options.description,
      defaultOrder: options.defaultOrder,
      answer: options.answer,
      gameId: options.gameId,
      cost: options.cost,
      penalty: options.penalty,
      name: options.name,
    });
  }

  reconstitute(options: TeamOptions): Task {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new TaskDomain(), options),
    );
  }
}
