import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { InjectionToken as TaskInjectionToken } from '../../../task/application/injection.token';
import { InjectionToken as TaskInstanceInjectionToken } from '../../../task-instance/application/injection.token';
import { TaskRepository } from '../../../task/domain/task.repository';
import { TaskInstanceRepository } from '../../../task-instance/domain/task-instance.repository';
import { TaskInstanceFactory } from '../../../task-instance/domain/task-instance.factory';
import { generateString } from '@nestjs/typeorm';
import { GameTaskDistributeRequestedEvent } from '../../../game/domain/event/game-task.distribute.requested.event';
import { TasksDistributed } from 'src/task-instance/domain/event/tasks.distributed';
import { getRandomInt } from 'src/common/random-num';

@EventsHandler(GameTaskDistributeRequestedEvent)
export class TasksDistributeRequestedHandler
  implements IEventHandler<GameTaskDistributeRequestedEvent>
{
  readonly logger = new Logger(TasksDistributeRequestedHandler.name);
  @Inject(TaskInjectionToken.TaskRepository)
  taskRepository: TaskRepository;

  @Inject(TaskInstanceInjectionToken.TaskInstanceRepository)
  taskInstanceRepository: TaskInstanceRepository;

  constructor(
    private taskInstanceFactory: TaskInstanceFactory,
    private eventBus: EventBus,
  ) {}

  async handle(event: GameTaskDistributeRequestedEvent): Promise<void> {
    const count: number = await this.distributeByStrategy(
      event.instanceId,
      event.id,
      event.strategy,
    );
    await this.eventBus.publish(
      new TasksDistributed({
        gameId: event.id,
        teamId: event.teamId,
        gameInstanceId: event.instanceId,
      }),
      this.logger.debug(
        `${count} tasks for team ${event.teamId}, game ${event.id} distributed. Strategy: ${event.strategy}`,
      ),
    );
  }

  async distributeByStrategy(
    gameInstanceId: string,
    gameId: string,
    strategy: string,
  ) {
    switch (strategy) {
      case 'RANDOM':
        return await this.randomStrategy(gameInstanceId, gameId);
      case 'DEFAULT':
        return await this.defaultStrategy(gameInstanceId, gameId);
      default:
        return;
    }
  }

  async randomStrategy(gameInstanceId: string, gameId: string) {
    const tasks = await this.taskRepository.findByGameId(gameId);
    const result = await Promise.all(
      tasks.map(async (task) => {
        const taskInstance = this.taskInstanceFactory.create({
          gameInstanceId,
          taskId: task.id,
          order: getRandomInt(),
          id: generateString(),
        });
        await this.taskInstanceRepository.save(taskInstance);
      }),
    );
    return result.length;
  }

  async defaultStrategy(gameInstanceId: string, gameId: string) {
    const tasks = await this.taskRepository.findByGameId(gameId);
    const result = await Promise.all(
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
    return result.length;
  }
}
