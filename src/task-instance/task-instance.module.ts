import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TaskInstanceRepositoryImplements } from './infrastructure/task-instance.repository.implements';
import { TaskInstanceFactory } from './domain/task-instance.factory';

const application = [];

const infrastructure = [
  {
    provide: InjectionToken.TaskInstanceRepository,
    useClass: TaskInstanceRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, TaskInstanceFactory, ...infrastructure],
  exports: [...infrastructure, TaskInstanceFactory],
})
export class TaskInstanceModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
