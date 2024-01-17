import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GameInstanceRepository } from 'src/game-instance/domain/game-instance.repository';
import { InjectionToken } from '../../injection.token';
import { Inject } from '@nestjs/common';
import { RejectGameCommand } from './reject.game.command';

@CommandHandler(RejectGameCommand)
export class RejectGameHandler
  implements ICommandHandler<RejectGameCommand, void>
{
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;
  async execute(command: RejectGameCommand): Promise<void> {
    const instance = await this.repository.findById(command.gameInstanceId);
    instance.delete();
    await this.repository.delete(instance);
    instance.commit();
  }
}
