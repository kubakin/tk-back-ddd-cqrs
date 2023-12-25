import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { GameInstanceQuery } from '../game-instance.query';
import { TeamInstancesListQuery } from './team.instances.list.query';
import { TeamInstancesListResult } from './team.instances.list.result';

@QueryHandler(TeamInstancesListQuery)
export class TeamInstancesListHandler
  implements IQueryHandler<TeamInstancesListQuery, TeamInstancesListResult>
{
  @Inject(InjectionToken.GameInstanceQuery)
  gameInstanceQuery: GameInstanceQuery;

  async execute(
    query: TeamInstancesListQuery,
  ): Promise<TeamInstancesListResult> {
    return await this.gameInstanceQuery.existTeamGamesList(query);
  }
}
