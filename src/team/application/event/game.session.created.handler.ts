import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameInstanceCreated } from 'src/game-instance/domain/event/game-instance.created.event';
import { InjectionToken } from '../injection.token';
import { Inject } from '@nestjs/common';
import { TeamRepository } from 'src/team/domain/team.repository';

@EventsHandler(GameInstanceCreated)
export class GameSessionCreated implements IEventHandler<GameInstanceCreated> {
  @Inject(InjectionToken.TeamRepository)
  private readonly teamRepository: TeamRepository;
  async handle(event: GameInstanceCreated) {
    console.log(event);
    const team = await this.teamRepository.findById(event.teamId);
    team.changeCurrentSession(event.id);
    await this.teamRepository.save(team);
  }
}
