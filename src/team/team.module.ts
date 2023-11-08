import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TeamFactory } from './domain/team.factory';
import { TeamRepositoryImplements } from './infrastructure/team.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TeamCreateHandler } from './application/command/team.create/team.create.handler';
import { TeamDeleteHandler } from './application/command/team.delete/team.delete.handler';
import { DummyUseCases } from './dummy/dummy.use-cases';
import { TeamDummyRepositoryImplements } from './dummy/team.dummy.repository.implements';

const application = [TeamCreateHandler, TeamDeleteHandler];

const dummy = [DummyUseCases];

const infrastructure = [
  {
    provide: InjectionToken.TeamRepository,
    useClass: TeamRepositoryImplements,
  },
  {
    provide: InjectionToken.TeamRepositoryDummy,
    useClass: TeamDummyRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, TeamFactory, ...infrastructure, ...dummy],
})
export class TeamModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
