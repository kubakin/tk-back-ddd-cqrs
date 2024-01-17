import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TaskInstanceRepositoryImplements } from './infrastructure/task-instance.repository.implements';
import { TaskInstanceFactory } from './domain/task-instance.factory';
import { TaskModule } from '../task/task.module';
import { AttemptCreatedHandler } from './application/event/attempt.created.handler';
import { TasksDistributeRequestedHandler } from './application/event/tasks.distribute.requested.handler';
import { UserTaskInstanceResolver } from './api/user/task-instance.resolver';
import { AdminTaskInstanceResolver } from './api/admin/task-instance.resolver';
import { RepoProvider } from 'src/common/repo.provider';
import { AttemptSucceedHandler } from './application/event/attempt.successed.handler';
import { AttemptFailedHandler } from './application/event/attempt.declined.handler';
import { TaskAssignerSaga } from './application/saga/task.assigner/task.assigner.saga';
import { TaskAssignHandler } from './application/command/task.assign/task.assign.handler';
import { TaskVoidHandler } from './application/command/task.void/task.void.handler';

const application = [
  AttemptCreatedHandler,
  TasksDistributeRequestedHandler,
  AttemptSucceedHandler,
  AttemptFailedHandler,
  TaskAssignerSaga,
  TaskAssignHandler,
  TaskVoidHandler
];

const infrastructure = [
  {
    provide: InjectionToken.TaskInstanceRepository,
    useClass: TaskInstanceRepositoryImplements,
  },
];

const resolvers = [AdminTaskInstanceResolver, UserTaskInstanceResolver];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule, TaskModule],
  providers: [
    ...application,
    TaskInstanceFactory,
    ...infrastructure,
    ...resolvers,
    RepoProvider,
  ],
  exports: [...infrastructure, TaskInstanceFactory],
})
export class TaskInstanceModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
