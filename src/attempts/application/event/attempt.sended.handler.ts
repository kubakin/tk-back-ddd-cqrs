import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SendAttemptRequestedEvent } from '../../../team/domain/event/send.attempt.requested.event';
import { AttemptFactory } from '../../domain/attempt.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { AttemptRepository } from '../../domain/attempt.repository';
import { generateString } from '@nestjs/typeorm';

@EventsHandler(SendAttemptRequestedEvent)
export class AttemptSendedHandler
  implements IEventHandler<SendAttemptRequestedEvent>
{
  @Inject(InjectionToken.AttemptRepository) repository: AttemptRepository;

  constructor(private factory: AttemptFactory) {}

  async handle(event: SendAttemptRequestedEvent): Promise<void> {
    const attempt = this.factory.create({
      teamId: event.teamId,
      taskInstanceId: event.taskInstanceId,
      data: event.answer,
      id: generateString(),
      userId: event.userId,
    });
    attempt.created();
    await this.repository.save(attempt);
    attempt.commit();
  }
}
