import { TeamRepositoryImplements } from '../infrastructure/team.repository.implements';
import { Injectable } from '@nestjs/common';
import { TeamFactory } from '../domain/team.factory';
import { Like } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class TeamDummyRepositoryImplements extends TeamRepositoryImplements {
  constructor(
    readonly factory: TeamFactory,
    readonly eventBus: EventBus,
  ) {
    super(factory, eventBus);
  }

  async findDummyTeamIds() {
    const entities = await this.repository.find({
      where: { name: Like(`%dummy%`) },
    });
    return entities.map((it) => it.id);
  }
}
