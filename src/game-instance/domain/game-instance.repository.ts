import { GameInstance } from './game-instance.domain';

export class GameInstanceRepository {
  save: (user: GameInstance) => Promise<void>;
  findById: (id: string) => Promise<GameInstance | null>;
  findAll: () => Promise<GameInstance[]>;
}
