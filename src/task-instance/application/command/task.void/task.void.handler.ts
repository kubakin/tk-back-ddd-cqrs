import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { TaskInstanceRepository } from 'src/task-instance/domain/task-instance.repository';
import { InjectionToken } from '../../injection.token';
import { Inject } from '@nestjs/common';
import { TaskOverEvent } from 'src/task-instance/domain/event/task.over.event';
import { TaskVoidCommand } from './task.void.commad';

@CommandHandler(TaskVoidCommand)
export class TaskVoidHandler
  implements ICommandHandler<TaskVoidCommand, void>
{
  @Inject(InjectionToken.TaskInstanceRepository)
  taskInstanceRepository: TaskInstanceRepository;
  constructor(private eventBus: EventBus) {}

  async execute(command: TaskVoidCommand): Promise<void> {
    const task = await this.taskInstanceRepository.findById(
      command.taskInstanceId,
    );
    task.void()
    await this.taskInstanceRepository.save(task);
    task.commit()
  }
}
