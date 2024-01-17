import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameInstanceCreated } from 'src/game-instance/domain/event/game-instance.created.event';
import { InjectionToken } from '../injection.token';
import { Inject } from '@nestjs/common';
import { TeamRepository } from 'src/team/domain/team.repository';
import { GameInstanceDeleted } from 'src/game-instance/domain/event/game-instance.deleted.event';

@EventsHandler(GameInstanceDeleted)
export class GameSessionDeleted implements IEventHandler<GameInstanceDeleted> {
  @Inject(InjectionToken.TeamRepository)
  private readonly teamRepository: TeamRepository;
  async handle(event: GameInstanceDeleted) {
    const team = await this.teamRepository.findById(event.teamId);
    team.changeCurrentSession(null);
    await this.teamRepository.save(team);
  }
}
