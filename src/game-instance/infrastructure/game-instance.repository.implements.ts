import { GameInstanceRepository } from '../domain/game-instance.repository';
import { GameInstance } from '../domain/game-instance.domain';
import { GameInstanceFactory } from '../domain/game-instance.factory';
import { GameInstanceEntity } from './game-instance.entity';
import { Injectable } from '@nestjs/common';
import { writeConnection } from '../../../lib/db.module';

@Injectable()
export class GameInstanceRepositoryImplements
  implements GameInstanceRepository
{
  constructor(private factory: GameInstanceFactory) {}

  async save(team: GameInstance) {
    const models = [team];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  async delete(team: GameInstance) {
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

  private entityToModel(data: GameInstanceEntity): GameInstance {
    return this.factory.reconstitute(data);
  }

  private modelToEntity(data: any): GameInstanceEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(GameInstanceEntity);
  }
}
