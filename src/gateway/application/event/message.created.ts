import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MessageCreated } from "../../../chat/domain/events/message.created";

// import { AdminGateway } from '../../admin.gateway';

@EventsHandler(MessageCreated)
export class MessageCreatedHandler implements IEventHandler<MessageCreated> {
  constructor(private gateway: any) {
  }

  async handle(event: MessageCreated): Promise<void> {
    if (event.adminId) {
    } else {
      // this.gateway.notifyMsg({
      //   text: event.text,
      //   teamId: event.teamId,
      //   id: event.id,
      //   userId: event.userId,
      // });
    }
  }
}
