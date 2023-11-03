import { Team } from './team.domain';

export class TeamRepository {
  save: (user: Team) => Promise<void>;
  findById: (id: string) => Promise<Team | null>;
  findAll: () => Promise<Team[]>;
}
