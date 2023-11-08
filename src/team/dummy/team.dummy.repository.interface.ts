import { TeamRepository } from '../domain/team.repository';

export interface TeamDummyRepositoryInterface extends TeamRepository {
  findDummyTeamIds: () => Promise<string[]>;
}
