import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { TaskInstanceRepository } from '../../domain/task-instance.repository';
import { InjectionToken as TaskInjectionToken } from '../../../task/application/injection.token';
import { TaskRepository } from '../../../task/domain/task.repository';
import { AttemptFailed } from 'src/attempts/domain/event/attempt.failed';

@EventsHandler(AttemptFailed)
export class AttemptFailedHandler implements IEventHandler<AttemptFailed> {
  @Inject(InjectionToken.TaskInstanceRepository)
  repository: TaskInstanceRepository;
  @Inject(TaskInjectionToken.TaskRepository) taskRepository: TaskRepository;

  async handle(event: AttemptFailed): Promise<void> {
    const instance = await this.repository.findById(event.taskInstanceId);
    instance.reject(event.scoreChange);
    instance.commit();
  }
}
