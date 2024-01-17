import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReleaseGameCommand } from './release.game.command';
import { GameInstanceRepository } from 'src/game-instance/domain/game-instance.repository';
import { InjectionToken } from '../../injection.token';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(ReleaseGameCommand)
export class ReleaseGameHandler
  implements ICommandHandler<ReleaseGameCommand, void>
{
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;
  async execute(command: ReleaseGameCommand): Promise<void> {
    const instance = await this.repository.findById(command.gameInstanceId);
    instance.release()
    await this.repository.save(instance);
    instance.commit()
  }
}
