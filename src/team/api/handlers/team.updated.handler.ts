import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { pubSub } from '../../../app.module';
import { RepoProvider } from 'src/common/repo.provider';
import { TeamUpdatedEvent } from 'src/team/infrastructure/event/team.updated.event';
import { UserUpdatedEvent } from 'src/user/infrastructure/event/user.updated.event';

@EventsHandler(TeamUpdatedEvent)
export class TeamUpdatedHandler implements IEventHandler<TeamUpdatedEvent> {
  constructor(
    private provider: RepoProvider,
    private eventBus: EventBus,
  ) {}
  async handle(event: TeamUpdatedEvent) {
    const users = await this.provider.userRepository.find({
      where: { teamId: event.id },
    });
    users.map(async (it) => {
      await this.eventBus.publish(new UserUpdatedEvent(it));
    });
  }
}
