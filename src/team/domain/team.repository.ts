import { Team } from './team.domain';

export class TeamRepository {
  save: (team: Team) => Promise<void>;
  delete: (team: Team) => Promise<void>;
  findById: (id: string) => Promise<Team | null>;
  findByCreatorId: (id: string) => Promise<Team | null>;
  findAll: () => Promise<Team[]>;
}
