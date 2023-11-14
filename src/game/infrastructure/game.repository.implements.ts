import { GameRepository } from '../domain/game.repository';
import { Game } from '../domain/game.domain';
import { GameFactory } from '../domain/game.factory';
import { GameEntity } from './game.entity';
import { writeConnection } from '../../../lib/db.module';

export class GameRepositoryImplements implements GameRepository {
  constructor(private gameFactory: GameFactory) {}

  async save(game: Game) {
    const models = [game];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  async delete(game: Game) {
    const models = [game];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.remove(entities);
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    return this.entityToModel(entity);
  }

  async findAll() {
    const entities = await this.repository.find();
    return entities.map((it) => this.entityToModel(it));
  }

  private entityToModel(data: GameEntity): Game {
    return this.gameFactory.reconstitute(data);
  }

  private modelToEntity(data: any): GameEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(GameEntity);
  }
}
