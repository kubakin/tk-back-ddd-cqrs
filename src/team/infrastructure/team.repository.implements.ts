import { TeamRepository } from '../domain/team.repository';
import { Team } from '../domain/team.domain';
import { TeamFactory } from '../domain/team.factory';
import { TeamEntity } from './team.entity';
import { Injectable } from '@nestjs/common';
import { writeConnection } from '../../../lib/db.module';

@Injectable()
export class TeamRepositoryImplements implements TeamRepository {
  constructor(private teamFactory: TeamFactory) {}

  async save(team: Team) {
    const models = [team];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  async delete(team: Team) {
    const models = [team];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.remove(entities);
  }

  async findAll() {
    const entities = await this.repository.find();
    return entities.map((it) => this.entityToModel(it));
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    return this.entityToModel(entity);
  }

  private entityToModel(data: TeamEntity): Team {
    return this.teamFactory.reconstitute(data);
  }

  private modelToEntity(data: any): TeamEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(TeamEntity);
  }
}
