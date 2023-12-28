import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UserRegisterHandler } from "./application/command/user.register/user.register.handler";
import { UserFactory } from "./domain/user.factory";
import { UserRepositoryImplements } from "./infrastructure/user.repository.implements";
import { InjectionToken } from "./application/injection.token";
import { AuthorizationOnlyModule } from "../../lib/authorization/src";
import { UserLoginHandler } from "./application/command/user.login/user.login.handler";
import { UserJoinHandler } from "./application/command/user.join/user.join.handler";
import { UserLeaveHandler } from "./application/command/user.leave/user.leave.handler";
import { DummyUseCases } from "./dummy/dummy.use-cases";
import { UserDeleteHandler } from "./application/command/user.delete/user.delete.handler";
import { UserController } from "./api/user.controller";
import { AUTH_DATA_PROVIDER } from "../../lib/authorization/src/api/auth-data-provider";
import { UserAuthDataProvider } from "./application/providers/user-auth-data-provider.service";
import { AuthService } from "../../lib/authorization/src/api/auth.service";
import { UserQueryImplements } from "./infrastructure/user.query.implements";
import { UserAdminController } from "./api/user.admin.controller";
import { UserListHandler } from "./application/query/user.list/user.list.handler";
import { SendMessageHandler } from "./application/command/send.message/send.message.handler";
import { MeHandler } from "./application/query/me/me.handler";
import { RepoProvider } from "../common/repo.provider";
import { UserUserResolver } from "./api/user/user.resolver";
import { AddLeaderToTeamHandler } from "./application/event/add-leader-to-team.handler";
import { UserUpdatedHandler } from "./api/handlers/user.updated.handler";

const application = [
  UserRegisterHandler,
  UserLoginHandler,
  UserJoinHandler,
  SendMessageHandler,
  UserLeaveHandler,
  UserDeleteHandler,
  UserListHandler,
  MeHandler,
  AddLeaderToTeamHandler,
  UserUpdatedHandler
];

const resolvers = [UserUserResolver];

const dummy = [DummyUseCases];

const infrastructure = [
  {
    provide: InjectionToken.UserRepository,
    useClass: UserRepositoryImplements
  },
  {
    provide: InjectionToken.UserQuery,
    useClass: UserQueryImplements
  }
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [
    ...application,
    UserFactory,
    ...infrastructure,
    AuthService,
    ...resolvers,
    {
      provide: AUTH_DATA_PROVIDER,
      useClass: UserAuthDataProvider
    },
    RepoProvider
  ],
  exports: [AUTH_DATA_PROVIDER],
  controllers: [UserController, UserAdminController]
})
export class UserModule {
  constructor() {
  }
}
