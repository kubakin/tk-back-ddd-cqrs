import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TeamCreatedEvent } from "../../../team/domain/event/team.created.event";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "../injection.token";
import { UserRepository } from "../../domain/user.repository";

@EventsHandler(TeamCreatedEvent)
export class AddLeaderToTeamHandler implements IEventHandler<TeamCreatedEvent> {
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  async handle(event: TeamCreatedEvent): Promise<void> {
    const user = await this.userRepository.findById(event.createdBy);
    user.join(event.id);
    await this.userRepository.save(user);
    user.commit();
  }
}