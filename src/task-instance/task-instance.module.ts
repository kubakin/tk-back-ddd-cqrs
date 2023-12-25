import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TaskInstanceRepositoryImplements } from './infrastructure/task-instance.repository.implements';
import { TaskInstanceFactory } from './domain/task-instance.factory';
import { TaskModule } from '../task/task.module';
import { AttemptCreatedHandler } from './application/event/attempt.created.handler';
import { TasksDistributeRequestedHandler } from './application/event/tasks.distribute.requested.handler';

const application = [AttemptCreatedHandler, TasksDistributeRequestedHandler];

const infrastructure = [
  {
    provide: InjectionToken.TaskInstanceRepository,
    useClass: TaskInstanceRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule, TaskModule],
  providers: [...application, TaskInstanceFactory, ...infrastructure],
  exports: [...infrastructure, TaskInstanceFactory],
})
export class TaskInstanceModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
