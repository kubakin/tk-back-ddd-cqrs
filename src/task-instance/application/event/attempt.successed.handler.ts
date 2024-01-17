import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AttemptCreated } from '../../../attempts/domain/event/attempt.created';
import { Inject } from '@nestjs/common';
// import { InjectionToken } from "../injection.token";
import { InjectionToken } from '../injection.token';
import { TaskInstanceRepository } from '../../domain/task-instance.repository';
import { InjectionToken as TaskInjectionToken } from '../../../task/application/injection.token';
import { TaskRepository } from '../../../task/domain/task.repository';
import { AttemptSucceed } from 'src/attempts/domain/event/attempt.succeed';

@EventsHandler(AttemptSucceed)
export class AttemptSucceedHandler implements IEventHandler<AttemptSucceed> {
  @Inject(InjectionToken.TaskInstanceRepository)
  repository: TaskInstanceRepository;
  @Inject(TaskInjectionToken.TaskRepository) taskRepository: TaskRepository;

  async handle(event: AttemptSucceed): Promise<void> {
    const instance = await this.repository.findById(event.taskInstanceId);
    instance.approve(event.userId, event.scoreChange);
    await this.repository.save(instance);
    instance.commit();
  }
}
