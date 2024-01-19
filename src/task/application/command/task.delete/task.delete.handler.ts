import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskDeleteCommand } from './task.delete.command';
import { TaskFactory } from '../../../domain/task.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TaskRepository } from '../../../domain/task.repository';

@CommandHandler(TaskDeleteCommand)
export class TaskDeleteHandler
  implements ICommandHandler<TaskDeleteCommand, void>
{
  @Inject(InjectionToken.TaskRepository)
  private readonly taskRepository: TaskRepository;

  constructor(private taskFactory: TaskFactory) {}

  async execute(command: TaskDeleteCommand): Promise<void> {
    const task = await this.taskRepository.findById(command.id);
    await this.taskRepository.delete(task);
  }
}
