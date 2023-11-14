import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GameFactory } from '../../../domain/game.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { GameRepository } from '../../../domain/game.repository';
import { GameUpdateCommand } from './game.update.command';

@CommandHandler(GameUpdateCommand)
export class GameUpdateHandler
  implements ICommandHandler<GameUpdateCommand, void>
{
  @Inject(InjectionToken.GameRepository)
  private readonly gameRepository: GameRepository;

  constructor(private gameFactory: GameFactory) {}

  async execute(command: GameUpdateCommand): Promise<void> {
    const game = await this.gameRepository.findById(command.id);
    game.update(command);
    await this.gameRepository.save(game);
  }
}
