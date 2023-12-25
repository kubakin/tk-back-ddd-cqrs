import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskFactory } from './domain/task.factory';
import { TaskRepositoryImplements } from './infrastructure/task.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TaskCreateHandler } from './application/command/task.create/task.create.handler';

const application = [TaskCreateHandler];

const infrastructure = [
  {
    provide: InjectionToken.TaskRepository,
    useClass: TaskRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, TaskFactory, ...infrastructure],
  exports: [...infrastructure, TaskFactory],
})
export class TaskModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
