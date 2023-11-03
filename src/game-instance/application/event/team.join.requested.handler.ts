import { TeamJoinRequestedEvent } from '../../../team/domain/event/team.join.requested.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameInstanceFactory } from '../../domain/game-instance.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { GameInstanceRepository } from '../../domain/game-instance.repository';
import { GameRepository } from '../../../game/domain/game.repository';

@EventsHandler(TeamJoinRequestedEvent)
export class TeamJoinRequestedHandler implements IEventHandler {
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;

  @Inject(InjectionToken.GameInstance)
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
    if (game.isFree) {
      gameInstance.paid();
    }
    await this.repository.save(gameInstance);
    gameInstance.commit();
  }
}
