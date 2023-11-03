import { GameRepository } from '../domain/game.repository';
import { Game } from '../domain/game.domain';
import { GameFactory } from '../domain/game.factory';
import { GameEntity } from './game.entity';

const repository: GameEntity[] = [
  {
    id: '1',
    name: 'Game 1',
    cost: 300,
    deleted: false,
    disabled: false,
  },
];

export class GameRepositoryImplements implements GameRepository {
  constructor(private gameFactory: GameFactory) {}

  async save(team: Game) {
    repository.push(this.modelToEntity(team));
    console.log(repository);
  }

  async findById(id: string) {
    return this.entityToModel(repository.find((item) => item.id === id));
  }

  async findAll() {
    return repository.map((item) => this.entityToModel(item));
  }

  private entityToModel(data: GameEntity): Game {
    return this.gameFactory.reconstitute(data);
  }

  private modelToEntity(data: any): GameEntity {
    return { ...data };
  }
}
