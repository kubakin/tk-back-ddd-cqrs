import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { pubSub } from '../../../app.module';
import { RepoProvider } from 'src/common/repo.provider';
import { TeamUpdatedEvent } from 'src/team/infrastructure/event/team.updated.event';
import { UserUpdatedEvent } from 'src/user/infrastructure/event/user.updated.event';
import { GameInstanceUpdated } from 'src/game-instance/infrastructure/event/game-instance.updated.event';

@EventsHandler(GameInstanceUpdated)
export class GameInstanceUpdatedHandler
  implements IEventHandler<GameInstanceUpdated>
{
  constructor(
    private provider: RepoProvider,
    private eventBus: EventBus,
  ) {}
  async handle(event: GameInstanceUpdated) {
    const team = await this.provider.teamRepository.findOne({
      where: { id: event.teamId },
    });
    await this.eventBus.publish(new TeamUpdatedEvent(team));
  }
}
