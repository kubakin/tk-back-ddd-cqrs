import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserUpdatedEvent } from "../../infrastructure/event/user.updated.event";
import { pubSub } from "../../../app.module";


@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  async handle(event: UserUpdatedEvent) {
    await pubSub.publish("userUpdated", { userUpdated: event });
  }
}