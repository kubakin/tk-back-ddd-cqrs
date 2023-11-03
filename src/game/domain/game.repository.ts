import { Game } from './game.domain';

export class GameRepository {
  save: (user: Game) => Promise<void>;
  findById: (id: string) => Promise<Game | null>;
  findAll: () => Promise<Game[]>;
}
