import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskFactory } from './domain/task.factory';
import { TaskRepositoryImplements } from './infrastructure/task.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TaskCreateHandler } from './application/command/task.create/task.create.handler';
import { AdminTaskResolver } from './api/admin/task.resolver';
import { UserTaskResolver } from './api/user/task.resolver';
import { RepoProvider } from 'src/common/repo.provider';
import { TaskDeleteHandler } from './application/command/task.delete/task.delete.handler';
import { TaskUpdateHandler } from './application/command/task.update/task.update.handler';

const application = [TaskCreateHandler, TaskDeleteHandler, TaskUpdateHandler];

const infrastructure = [
  {
    provide: InjectionToken.TaskRepository,
    useClass: TaskRepositoryImplements,
  },
];

const resolvers = [AdminTaskResolver, UserTaskResolver];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [
    ...application,
    TaskFactory,
    ...infrastructure,
    ...resolvers,
    RepoProvider,
  ],
  exports: [...infrastructure, TaskFactory],
})
export class TaskModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
