import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRegisterHandler } from './application/command/user.register/user.register.handler';
import { UserFactory } from './domain/user.factory';
import { UserRepositoryImplements } from './infrastructure/user.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { UserLoginHandler } from './application/command/user.login/user.login.handler';
import { UserJoinHandler } from './application/command/user.join/user.join.handler';
import { UserLeaveHandler } from './application/command/user.leave/user.leave.handler';
import { DummyUseCases } from './dummy/dummy.use-cases';
import { UserDeleteHandler } from './application/command/user.delete/user.delete.handler';

const application = [
  UserRegisterHandler,
  UserLoginHandler,
  UserJoinHandler,
  UserLeaveHandler,
  UserDeleteHandler,
];

const dummy = [DummyUseCases];

const infrastructure = [
  {
    provide: InjectionToken.UserRepository,
    useClass: UserRepositoryImplements,
  },
  {
    provide: InjectionToken.UserQuery,
    useClass: UserRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, UserFactory, ...infrastructure, ...dummy],
})
export class UserModule {
  constructor() {}
}
