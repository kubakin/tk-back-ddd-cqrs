import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken as TaskInjectionToken } from '../../../task/application/injection.token';
import { InjectionToken as TaskInstanceInjectionToken } from '../../../task-instance/application/injection.token';
import { TaskRepository } from '../../../task/domain/task.repository';
import { TaskInstanceRepository } from '../../../task-instance/domain/task-instance.repository';
import { TaskInstanceFactory } from '../../../task-instance/domain/task-instance.factory';
import { generateString } from '@nestjs/typeorm';
import { GameTaskDistributeRequestedEvent } from '../../../game/domain/event/game-task.distribute.requested.event';

@EventsHandler(GameTaskDistributeRequestedEvent)
export class TasksDistributeRequestedHandler
  implements IEventHandler<GameTaskDistributeRequestedEvent>
{
  @Inject(TaskInjectionToken.TaskRepository)
  taskRepository: TaskRepository;

  @Inject(TaskInstanceInjectionToken.TaskInstanceRepository)
  taskInstanceRepository: TaskInstanceRepository;

  constructor(private taskInstanceFactory: TaskInstanceFactory) {}

  async handle(event: GameTaskDistributeRequestedEvent): Promise<void> {
    await this.distributeByStrategy(event.instanceId, event.id, event.strategy);
  }

  async distributeByStrategy(
    gameInstanceId: string,
    gameId: string,
    strategy: string,
  ) {
    switch (strategy) {
      case 'RANDOM':
        await this.randomStrategy(gameInstanceId, gameId);
        return;
      case 'DEFAULT':
        await this.defaultStrategy(gameInstanceId, gameId);
        return;
    }
  }

  async randomStrategy(gameInstanceId: string, gameId: string) {
    const tasks = await this.taskRepository.findByGameId(gameId);
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

  async defaultStrategy(gameInstanceId: string, gameId: string) {
    const tasks = await this.taskRepository.findByGameId(gameId);
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
