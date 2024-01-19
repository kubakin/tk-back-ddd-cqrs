import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskCreateCommand } from './task.create.command';
import { TaskFactory } from '../../../domain/task.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TaskRepository } from '../../../domain/task.repository';

@CommandHandler(TaskCreateCommand)
export class TaskCreateHandler
  implements ICommandHandler<TaskCreateCommand, void>
{
  @Inject(InjectionToken.TaskRepository)
  private readonly taskRepository: TaskRepository;

  constructor(private taskFactory: TaskFactory) {}

  async execute(command: TaskCreateCommand): Promise<void> {
    const user = this.taskFactory.create({
      id: command.id,
      description: command.description,
      answer: command.answer,
      type: command.type,
      gameId: command.gameId,
      name: command.name,
      cost: command.cost,
      penalty: command.penalty,
    });
    await this.taskRepository.save(user);
  }
}
