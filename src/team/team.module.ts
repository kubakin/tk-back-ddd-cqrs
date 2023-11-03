import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TeamFactory } from './domain/team.factory';
import { TeamRepositoryImplements } from './infrastructure/team.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TeamCreateHandler } from './application/command/team.create/team.create.handler';
import { TeamResolver } from './api/graphql/team.resolver';

const application = [TeamCreateHandler];

const infrastructure = [
  {
    provide: InjectionToken.TeamRepository,
    useClass: TeamRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, TeamFactory, ...infrastructure, TeamResolver],
})
export class TeamModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
