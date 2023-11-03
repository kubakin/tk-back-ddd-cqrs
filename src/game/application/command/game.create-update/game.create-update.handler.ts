import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GameCreateUpdateCommand } from './game.create-update.command';
import { GameFactory } from '../../../domain/game.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { GameRepository } from '../../../domain/game.repository';

@CommandHandler(GameCreateUpdateCommand)
export class GameCreateUpdateHandler
  implements ICommandHandler<GameCreateUpdateCommand, void>
{
  @Inject(InjectionToken.GameRepository)
  private readonly gameRepository: GameRepository;

  constructor(private gameFactory: GameFactory) {}

  async execute(command: GameCreateUpdateCommand): Promise<void> {
    const user = this.gameFactory.create({
      id: command.id,
      name: command.name,
      disabled: command.disabled,
      cost: command.cost,
    });
    await this.gameRepository.save(user);
  }
}
