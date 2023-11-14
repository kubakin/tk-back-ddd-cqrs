import { GamesProgressResult } from './games.progress/games.progress.result';
import { GamesProgressQuery } from './games.progress/games.progress.query';

export interface GameInstanceQuery {
  gamesProgress: (query: GamesProgressQuery) => Promise<GamesProgressResult>;
}
