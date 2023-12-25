import { TeamJoinRequestedEvent } from '../../../team/domain/event/team.join.requested.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameInstanceFactory } from '../../domain/game-instance.factory';
import { Inject } from '@nestjs/common';
import { GameInstanceRepository } from '../../domain/game-instance.repository';
import { GameRepository } from '../../../game/domain/game.repository';
import { InjectionToken as GameInjectionToken } from '../../../game/application/injection.token';
import { InjectionToken } from '../injection.token';

@EventsHandler(TeamJoinRequestedEvent)
export class TeamJoinRequestedHandler implements IEventHandler {
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;

  @Inject(GameInjectionToken.GameRepository)
  gameRepository: GameRepository;

  constructor(private factory: GameInstanceFactory) {}

  async handle(event: TeamJoinRequestedEvent): Promise<void> {
    const game = await this.gameRepository.findById(event.gameId);
    if (!game) return;
    const gameInstance = this.factory.create({
      id: event.id,
      gameId: event.gameId,
      teamId: event.teamId,
    });

    await this.repository.save(gameInstance);
    if (game.isFree) {
      game.distribute(event.id);
      game.commit();
    }
    gameInstance.commit();
  }
}
