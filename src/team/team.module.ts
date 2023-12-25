import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TeamFactory } from "./domain/team.factory";
import { TeamRepositoryImplements } from "./infrastructure/team.repository.implements";
import { InjectionToken } from "./application/injection.token";
import { AuthorizationOnlyModule } from "../../lib/authorization/src";
import { TeamCreateHandler } from "./application/command/team.create/team.create.handler";
import { TeamDeleteHandler } from "./application/command/team.delete/team.delete.handler";
import { DummyUseCases } from "./dummy/dummy.use-cases";
import { TeamDummyRepositoryImplements } from "./dummy/team.dummy.repository.implements";
import { TeamController } from "./api/team.controller";
import { TeamQueryImplements } from "./infrastructure/team.query.implements";
import { TeamListHandler } from "./application/query/team.list/team.list.handler";
import { TeamAdminController } from "./api/team.admin.controller";
import { TeamStartGameHandler } from "./application/command/team.start.game/team.start.game.handler";
import { RepoProvider } from "../common/repo.provider";
import { UserTeamResolver } from "./api/user/team.resolver";
import { TeamChangeSessionHandler } from "./application/command/team.change.session/team.change.session.handler";

const application = [
  TeamCreateHandler,
  TeamDeleteHandler,
  TeamListHandler,
  TeamStartGameHandler,
  TeamChangeSessionHandler
];

const resolvers = [UserTeamResolver];

const dummy = [DummyUseCases];

const infrastructure = [
  {
    provide: InjectionToken.TeamRepository,
    useClass: TeamRepositoryImplements
  },
  {
    provide: InjectionToken.TeamRepositoryDummy,
    useClass: TeamDummyRepositoryImplements
  },
  {
    provide: InjectionToken.TeamQuery,
    useClass: TeamQueryImplements
  }
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [
    ...application,
    TeamFactory,
    ...infrastructure,
    RepoProvider,
    ...resolvers
  ],
  controllers: [TeamController, TeamAdminController]
})
export class TeamModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
