import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { GameFactory } from '../domain/game.factory';
import { GameRepositoryImplements } from '../infrastructure/game.repository.implements';

@Injectable()
export class GameDummyRepositoryImplements extends GameRepositoryImplements {
  constructor(private factory: GameFactory) {
    super(factory);
  }

  async findDummyTeamIds() {
    const entities = await this.repository.find({
      where: { name: Like(`%dummy%`) },
    });
    return entities.map((it) => it.id);
  }
}
