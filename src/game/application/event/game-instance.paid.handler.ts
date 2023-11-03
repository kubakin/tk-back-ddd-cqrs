import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameInstancePaidEvent } from '../../../game-instance/domain/event/game-instance.paid.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { GameRepository } from '../../domain/game.repository';

@EventsHandler(GameInstancePaidEvent)
export class GameInstancePaidHandler
  implements IEventHandler<GameInstancePaidEvent>
{
  @Inject(InjectionToken.GameRepository)
  private readonly gameRepository: GameRepository;

  async handle(event: GameInstancePaidEvent) {
    const game = await this.gameRepository.findById(event.gameId);
    game.distribute(event.teamId);
    game.commit();
  }
}
