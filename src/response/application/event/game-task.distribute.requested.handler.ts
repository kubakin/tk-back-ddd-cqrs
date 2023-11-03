import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameTaskDistributeRequestedEvent } from '../../../game/domain/event/game-task.distribute.requested.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { TaskRepository } from '../../domain/task.repository';

@EventsHandler(GameTaskDistributeRequestedEvent)
export class GameTaskDistributeRequestedHandler implements IEventHandler {
  @Inject(InjectionToken.TaskRepository)
  private readonly taskRepository: TaskRepository;

  async handle(event: GameTaskDistributeRequestedEvent): Promise<void> {
    const tasks = await this.taskRepository.findByGameId(event.gameId);
  }
}
