import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FinishInstanceCommand } from './finish.instance.command';
import { InjectionToken } from '../../injection.token';
import { Inject } from '@nestjs/common';
import { GameInstanceRepository } from 'src/game-instance/domain/game-instance.repository';

@CommandHandler(FinishInstanceCommand)
export class FinishInstanceHandler
  implements ICommandHandler<FinishInstanceCommand, void>
{
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;
  async execute(command: FinishInstanceCommand): Promise<void> {
    const instance = await this.repository.findById(command.gameInstanceId);
    instance.finish();
    await this.repository.save(instance);
    instance.commit();
  }
}
