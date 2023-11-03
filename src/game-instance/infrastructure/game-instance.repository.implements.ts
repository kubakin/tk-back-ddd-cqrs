import { GameInstanceRepository } from '../domain/game-instance.repository';
import { GameInstance } from '../domain/game-instance.domain';
import { GameInstanceFactory } from '../domain/game-instance.factory';
import { GameInstanceEntity } from './game-instance.entity';

const repository: GameInstanceEntity[] = [
  {
    id: '1',
    gameId: 'Game 1',
    teamId: 'Game 1',
  },
];

export class GameInstanceRepositoryImplements
  implements GameInstanceRepository
{
  constructor(private gameFactory: GameInstanceFactory) {}

  async save(team: GameInstance) {
    repository.push(this.modelToEntity(team));
    console.log(repository);
  }

  async findById(id: string) {
    return this.entityToModel(repository.find((item) => item.id === id));
  }

  async findAll() {
    return repository.map((item) => this.entityToModel(item));
  }

  private entityToModel(data: GameInstanceEntity): GameInstance {
    return this.gameFactory.reconstitute(data);
  }

  private modelToEntity(data: any): GameInstanceEntity {
    return { ...data };
  }
}
