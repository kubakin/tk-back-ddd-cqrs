import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GameInstanceRepository } from '../../domain/game-instance.repository';
import { GameRepository } from '../../../game/domain/game.repository';
import { GameInstanceApprovedEvent } from '../../domain/event/game-instance.approved.event';
import { InjectionToken } from '../../../game-instance/application/injection.token';
import { InjectionToken as GameInjectionToken } from '../../../game/application/injection.token';
import { InjectionToken as TaskInjectionToken } from '../../../task/application/injection.token';
import { InjectionToken as TaskInstanceInjectionToken } from '../../../task-instance/application/injection.token';
import { TaskRepository } from '../../../task/domain/task.repository';
import { TaskInstanceRepository } from '../../../task-instance/domain/task-instance.repository';
import { GameParams } from '../../../game/domain/game.domain';
import { TaskInstanceFactory } from '../../../task-instance/domain/task-instance.factory';
import { generateString } from '@nestjs/typeorm';

@EventsHandler(GameInstanceApprovedEvent)
export class InstanceApprovedHandler
  implements IEventHandler<GameInstanceApprovedEvent>
{
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;

  @Inject(GameInjectionToken.GameRepository)
  gameRepository: GameRepository;

  @Inject(TaskInjectionToken.TaskRepository)
  taskRepository: TaskRepository;

  @Inject(TaskInstanceInjectionToken.TaskInstanceRepository)
  taskInstanceRepository: TaskInstanceRepository;

  constructor(private taskInstanceFactory: TaskInstanceFactory) {}

  async handle(event: GameInstanceApprovedEvent): Promise<void> {
    const gameInstance = await this.repository.findById(event.id);
    const game = await this.gameRepository.findById(event.gameId);
    await this.distributeByStrategy(game, event.id);
    if (game.startImmediate) {
      gameInstance.start();
      await this.repository.save(gameInstance);
      gameInstance.commit();
    }
  }

  async distributeByStrategy(strategy: GameParams, gameInstanceId: string) {
    switch (strategy.taskStrategy) {
      case 'RANDOM':
        await this.randomStrategy(strategy, gameInstanceId);
        return;
      case 'DEFAULT':
        await this.defaultStrategy(strategy, gameInstanceId);
        return;
    }
  }

  async randomStrategy(strategy: GameParams, gameInstanceId: string) {
    const tasks = await this.taskRepository.findByGameId(strategy.id);
    await Promise.all(
      tasks.map(async (task) => {
        const taskInstance = this.taskInstanceFactory.create({
          gameInstanceId,
          taskId: task.id,
          order: 123,
          id: generateString(),
        });
        await this.taskInstanceRepository.save(taskInstance);
      }),
    );
  }

  async defaultStrategy(strategy: GameParams, gameInstanceId: string) {
    const tasks = await this.taskRepository.findByGameId(strategy.id);
    await Promise.all(
      tasks.map(async (task) => {
        const taskInstance = this.taskInstanceFactory.create({
          gameInstanceId,
          taskId: task.id,
          order: task.defaultOrder,
          id: generateString(),
        });
        await this.taskInstanceRepository.save(taskInstance);
      }),
    );
  }
}
