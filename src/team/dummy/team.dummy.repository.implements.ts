import { TeamRepositoryImplements } from '../infrastructure/team.repository.implements';
import { Injectable } from '@nestjs/common';
import { TeamFactory } from '../domain/team.factory';
import { Like } from 'typeorm';

@Injectable()
export class TeamDummyRepositoryImplements extends TeamRepositoryImplements {
  constructor(private factory: TeamFactory) {
    super(factory);
  }

  async findDummyTeamIds() {
    const entities = await this.repository.find({
      where: { name: Like(`%dummy%`) },
    });
    return entities.map((it) => it.id);
  }
}
