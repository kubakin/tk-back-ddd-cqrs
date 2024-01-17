import { GameInstanceRepository } from '../domain/game-instance.repository';
import { GameInstance } from '../domain/game-instance.domain';
import { GameInstanceFactory } from '../domain/game-instance.factory';
import { GameInstanceEntity } from './game-instance.entity';
import { Injectable } from '@nestjs/common';
import { writeConnection } from '../../../lib/db.module';
import { EventBus } from '@nestjs/cqrs';
import { GameInstanceUpdated } from './event/game-instance.updated.event';

@Injectable()
export class GameInstanceRepositoryImplements
  implements GameInstanceRepository
{
  constructor(private factory: GameInstanceFactory,
    private eventBus: EventBus) {}

  async save(team: GameInstance) {
    const models = [team];
    const entities = models.map((model) => this.modelToEntity(model));
    const result = await this.repository.save(entities);
    result.map(async (it) => {
      await this.eventBus.publish(new GameInstanceUpdated(it));
    });
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

  async findOneForApprove(id: string) {
    const entity = await this.repository.findOne({ where: { id, status: 'Created' } });
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
