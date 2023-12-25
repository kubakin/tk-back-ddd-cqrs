import { TeamListQuery } from './team.list/team.list.query';
import { TeamListResult } from './team.list/team.list.result';

export interface TeamQuery {
  teamList: (query: TeamListQuery) => Promise<TeamListResult>;
}
