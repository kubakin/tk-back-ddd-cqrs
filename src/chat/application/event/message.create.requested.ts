import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SendUserMessageRequested } from '../../../user/domain/event/send.message.requested';
import { MessageFactory } from '../../domain/message.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { MessageRepository } from '../../domain/message.repository';

@EventsHandler(SendUserMessageRequested)
export class MessageCreateRequested
  implements IEventHandler<SendUserMessageRequested>
{
  constructor(private factory: MessageFactory) {}

  @Inject(InjectionToken.MessageRepository) repo: MessageRepository;

  async handle(event: SendUserMessageRequested): Promise<void> {
    const message = this.factory.create({
      id: event.id,
      teamId: event.teamId,
      text: event.text,
      userId: event.userId,
    });
    message.created();
    await this.repo.save(message);
    message.commit();
  }
}
