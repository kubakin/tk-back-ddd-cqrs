import { GameInstanceListResult } from './game.instance.list/game.instance.list.result';
import { GameInstanceListQuery } from './game.instance.list/game.instance.list.query';
import { TeamInstancesListQuery } from './team.instanses/team.instances.list.query';
import { TeamInstancesListResult } from './team.instanses/team.instances.list.result';

export interface GameInstanceQuery {
  gamesProgress: (
    query: GameInstanceListQuery,
  ) => Promise<GameInstanceListResult>;
  existTeamGamesList: (
    query: TeamInstancesListQuery,
  ) => Promise<TeamInstancesListResult>;
}
