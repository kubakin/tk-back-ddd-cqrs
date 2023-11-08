import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { AttemptSendedHandler } from './application/event/attempt.sended.handler';
import { AttemptRepositoryImplements } from './infrastructure/attempt.repository.implements';
import { AttemptFactory } from './domain/attempt.factory';

const application = [AttemptSendedHandler];

const infrastructure = [
  {
    provide: InjectionToken.AttemptRepository,
    useClass: AttemptRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, AttemptFactory, ...infrastructure],
})
export class AttemptModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
