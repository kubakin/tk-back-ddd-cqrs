import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GameFactory } from '../../../domain/game.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { GameRepository } from '../../../domain/game.repository';
import { GameCreateCommand } from './game.create.command';

@CommandHandler(GameCreateCommand)
export class GameCreateHandler
  implements ICommandHandler<GameCreateCommand, void>
{
  @Inject(InjectionToken.GameRepository)
  private readonly gameRepository: GameRepository;

  constructor(private gameFactory: GameFactory) {}

  async execute(command: GameCreateCommand): Promise<void> {
    const user = this.gameFactory.create(command);
    await this.gameRepository.save(user);
  }
}
