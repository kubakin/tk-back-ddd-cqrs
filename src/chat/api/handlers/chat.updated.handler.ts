import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { pubSub } from '../../../app.module';
import { MessageCreated } from 'src/chat/domain/events/message.created';

@EventsHandler(MessageCreated)
export class MessageCreatedHandler implements IEventHandler<MessageCreated> {
  async handle(event: MessageCreated) {
    await pubSub.publish(`chat_${event.teamId}`, { newMessage: event });
  }
}
