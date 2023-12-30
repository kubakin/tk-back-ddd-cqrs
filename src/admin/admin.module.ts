import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { AUTH_DATA_PROVIDER } from '../../lib/authorization/src/api/auth-data-provider';
import { AuthService } from '../../lib/authorization/src/api/auth.service';
import { AdminAuthDataProvider } from './application/providers/admin-auth-data-provider.service';
import { AdminRepositoryImplements } from './infrastructure/admin.repository.implements';
import { SendAdminMessageHandler } from './application/command/send.message/send.admin.message.handler';
import { AdminFactory } from './domain/admin.factory';
import { AuthContoller } from './api/auth.controller';

const application = [SendAdminMessageHandler];

const infrastructure = [
  {
    provide: InjectionToken.AdminRepository,
    useClass: AdminRepositoryImplements,
  },
  // {
  //   provide: InjectionToken.UserQuery,
  //   useClass: AdminQueryImplements,
  // },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [
    ...application,
    AdminFactory,
    ...infrastructure,
    AuthService,
    {
      provide: AUTH_DATA_PROVIDER,
      useClass: AdminAuthDataProvider,
    },
  ],
  exports: [AUTH_DATA_PROVIDER],
  controllers: [AuthContoller],
})
export class AdminModule {
  constructor() {}
}
