import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveGameCommand } from './approve.game.command';
import { GameInstanceRepository } from 'src/game-instance/domain/game-instance.repository';
import { InjectionToken } from '../../injection.token';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(ApproveGameCommand)
export class ApproveGameHandler
  implements ICommandHandler<ApproveGameCommand, void>
{
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;
  async execute(command: ApproveGameCommand): Promise<void> {
    const instance = await this.repository.findOneForApprove(command.gameInstanceId);
    if (!instance) throw new NotFoundException('Not found games for activate');
    instance.approve()
    await this.repository.save(instance);
    instance.commit()
  }
}
