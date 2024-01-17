import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameInstanceCreated } from 'src/game-instance/domain/event/game-instance.created.event';
import { InjectionToken } from '../injection.token';
import { GameRepository } from 'src/game/domain/game.repository';
import { Inject } from '@nestjs/common';
import { GameInstanceApprovedEvent } from 'src/game-instance/domain/event/game-instance.approved.event';

@EventsHandler(GameInstanceApprovedEvent)
export class GameInstanceApprovedHandler
  implements IEventHandler<GameInstanceApprovedEvent>
{
  @Inject(InjectionToken.GameRepository)
  private readonly gameRepository: GameRepository;
  async handle(event: GameInstanceApprovedEvent) {
    const game = await this.gameRepository.findById(event.gameId);
    game.distribute(event.id, event.teamId);
    game.commit();
  }
}
