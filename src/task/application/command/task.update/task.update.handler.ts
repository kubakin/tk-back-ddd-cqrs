import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskUpdateCommand } from './task.update.command';
import { TaskFactory } from '../../../domain/task.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TaskRepository } from '../../../domain/task.repository';

@CommandHandler(TaskUpdateCommand)
export class TaskUpdateHandler
  implements ICommandHandler<TaskUpdateCommand, void>
{
  @Inject(InjectionToken.TaskRepository)
  private readonly taskRepository: TaskRepository;

  constructor() {}

  async execute(command: TaskUpdateCommand): Promise<void> {
    const task = await this.taskRepository.findById(command.id);
    Object.assign(task, command);
    await this.taskRepository.save(task);
  }
}
