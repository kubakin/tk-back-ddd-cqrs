import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AttemptCreated } from '../../../attempts/domain/event/attempt.created';
import { Inject } from '@nestjs/common';
// import { InjectionToken } from "../injection.token";
import { InjectionToken } from '../injection.token';
import { TaskInstanceRepository } from '../../domain/task-instance.repository';
import { InjectionToken as TaskInjectionToken } from '../../../task/application/injection.token';
import { TaskRepository } from '../../../task/domain/task.repository';

@EventsHandler(AttemptCreated)
export class AttemptCreatedHandler implements IEventHandler<AttemptCreated> {
  @Inject(InjectionToken.TaskInstanceRepository)
  repository: TaskInstanceRepository;
  @Inject(TaskInjectionToken.TaskRepository) taskRepository: TaskRepository;

  async handle(event: AttemptCreated): Promise<void> {
    const taskInstance = await this.repository.findById(event.taskInstanceId);
    const task = await this.taskRepository.findTaskByInstanceThatNeedBeAnswered(
      taskInstance,
    );
    if (!task) {
      return;
    }
    task.validate(event.id, event.taskInstanceId, event.data);
    task.commit();
  }
}
