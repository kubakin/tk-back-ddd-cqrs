import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeScoreCommand } from './change.score.command';
import { InjectionToken } from '../../injection.token';
import { Inject } from '@nestjs/common';
import { GameInstanceRepository } from 'src/game-instance/domain/game-instance.repository';

@CommandHandler(ChangeScoreCommand)
export class ChangeScoreHandler
  implements ICommandHandler<ChangeScoreCommand, void>
{
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;
  async execute(command: ChangeScoreCommand): Promise<void> {
    const instance = await this.repository.findById(command.gameInstanceId);
    instance.changeScore(command.scoreChange);
    await this.repository.save(instance);
    instance.commit();
  }
}
