import { TeamRepository } from '../domain/team.repository';
import { Team } from '../domain/team.domain';
import { TeamFactory } from '../domain/team.factory';
import { TeamEntity } from './team.entity';
import { generateString } from '@nestjs/typeorm';

const repository: TeamEntity[] = [
  {
    id: '1',
    currentGameId: generateString(),
    createdBy: generateString(),
    createdAt: new Date(),
    name: 'Team 1',
  },
  {
    id: '2',
    currentGameId: generateString(),
    createdBy: generateString(),
    createdAt: new Date(),
    name: 'Team 2',
  },
  {
    id: '3',
    currentGameId: generateString(),
    createdBy: generateString(),
    createdAt: new Date(),
    name: 'Team 3',
  },
  {
    id: '4',
    currentGameId: generateString(),
    createdBy: generateString(),
    createdAt: new Date(),
    name: 'Team 4',
  },
  {
    id: '5',
    currentGameId: generateString(),
    createdBy: generateString(),
    createdAt: new Date(),
    name: 'Team 5',
  },
];

export class TeamRepositoryImplements implements TeamRepository {
  constructor(private teamFactory: TeamFactory) {}

  async save(team: Team) {
    repository.push(this.modelToEntity(team));
    console.log(repository);
  }

  async findById(id: string) {
    return this.entityToModel(repository.find((item) => item.id === id));
  }

  async findAll() {
    return repository.map((item) => this.entityToModel(item));
  }

  private entityToModel(data: TeamEntity): Team {
    return this.teamFactory.reconstitute(data);
  }

  private modelToEntity(data: any): TeamEntity {
    return { ...data };
  }
}
