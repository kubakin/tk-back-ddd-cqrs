import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { TaskAssignCommand } from './task.assign.commad';
import { TaskInstanceRepository } from 'src/task-instance/domain/task-instance.repository';
import { InjectionToken } from '../../injection.token';
import { Inject } from '@nestjs/common';
import { TaskOverEvent } from 'src/task-instance/domain/event/task.over.event';

@CommandHandler(TaskAssignCommand)
export class TaskAssignHandler
  implements ICommandHandler<TaskAssignCommand, void>
{
  @Inject(InjectionToken.TaskInstanceRepository)
  taskInstanceRepository: TaskInstanceRepository;
  constructor(private eventBus: EventBus) {}

  async execute(command: TaskAssignCommand): Promise<void> {
    const task = await this.taskInstanceRepository.findOneForDistribute(
      command.gameInstanceId,
    );
    if (task) {
      task.assignToGame();
      await this.taskInstanceRepository.save(task);
      task.commit();
    } else {
      await this.eventBus.publish(
        new TaskOverEvent({
          gameInstanceId: command.gameInstanceId,
        }),
      );
    }
  }
}
