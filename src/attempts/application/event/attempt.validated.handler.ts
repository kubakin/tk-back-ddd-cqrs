import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SendAttemptRequestedEvent } from '../../../team/domain/event/send.attempt.requested.event';
import { AttemptFactory } from '../../domain/attempt.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { AttemptRepository } from '../../domain/attempt.repository';
import { generateString } from '@nestjs/typeorm';
import { AttemptValidated } from 'src/task/domain/event/attempt.validated';

@EventsHandler(AttemptValidated)
export class AttemptValidatedHandler
  implements IEventHandler<AttemptValidated>
{
  @Inject(InjectionToken.AttemptRepository) repository: AttemptRepository;

  constructor(private factory: AttemptFactory) {}

  async handle(event: AttemptValidated): Promise<void> {
    const attempt = await this.repository.findById(event.attemptId);
    if (event.result) {
      attempt.approve(event.scoreChange);
    } else {
      attempt.decline(event.scoreChange);
    }
    await this.repository.save(attempt);
    attempt.commit();
  }
}
