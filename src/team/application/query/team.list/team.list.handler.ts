import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TeamListQuery } from './team.list.query';
import { TeamListResult } from './team.list.result';
import { TeamQuery } from '../team.query';

@QueryHandler(TeamListQuery)
export class TeamListHandler
  implements IQueryHandler<TeamListQuery, TeamListResult>
{
  @Inject(InjectionToken.TeamQuery) teamQuery: TeamQuery;

  async execute(query: TeamListQuery): Promise<TeamListResult> {
    return await this.teamQuery.teamList(query);
  }
}
