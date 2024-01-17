import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GameInstanceRepository } from '../../domain/game-instance.repository';
import { GameRepository } from '../../../game/domain/game.repository';
import { GameInstanceApprovedEvent } from '../../domain/event/game-instance.approved.event';
import { InjectionToken } from '../injection.token';
import { InjectionToken as GameInjectionToken } from '../../../game/application/injection.token';
import { InjectionToken as TaskInjectionToken } from '../../../task/application/injection.token';
import { InjectionToken as TaskInstanceInjectionToken } from '../../../task-instance/application/injection.token';
import { TaskRepository } from '../../../task/domain/task.repository';
import { TaskInstanceRepository } from '../../../task-instance/domain/task-instance.repository';
import { GameParams } from '../../../game/domain/game.domain';
import { TaskInstanceFactory } from '../../../task-instance/domain/task-instance.factory';
import { generateString } from '@nestjs/typeorm';
import { AssignToGameRequested } from 'src/task-instance/domain/event/assign-to-game.requested';

@EventsHandler(AssignToGameRequested)
export class ChangeGameInstanceTaskHandler
  implements IEventHandler<AssignToGameRequested>
{
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;

  async handle(event: AssignToGameRequested): Promise<void> {
    const gameInstance = await this.repository.findById(event.gameInstanceId);
    gameInstance.changeTask(event.taskInstanceId);
    await this.repository.save(gameInstance);
    gameInstance.commit();
  }
}
