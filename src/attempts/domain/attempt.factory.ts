import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { TaskAnswerType } from '../../task/domain/types/task-answer.type';
import { Attempt, AttemptDomain, AttemptOptions } from './attempt.domain';

interface CreateAttemptOption {
  id: string;
  taskInstanceId: string;
  teamId: string;
  data: TaskAnswerType;
  userId: string
}

@Injectable()
export class AttemptFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateAttemptOption): Attempt {
    return this.reconstitute({
      id: options.id,
      taskInstanceId: options.taskInstanceId,
      teamId: options.teamId,
      createdAt: new Date(),
      data: options.data,
      status: 'Created',
      userId: options.userId,
    });
  }

  reconstitute(options: AttemptOptions): Attempt {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new AttemptDomain(), options),
    );
  }
}
