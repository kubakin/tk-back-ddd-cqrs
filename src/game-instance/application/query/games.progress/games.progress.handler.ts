import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GamesProgressQuery } from './games.progress.query';
import { GamesProgressResult } from './games.progress.result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { GameInstanceQuery } from '../game-instance.query';

@QueryHandler(GamesProgressQuery)
export class GamesProgressHandler
  implements IQueryHandler<GamesProgressQuery, GamesProgressResult>
{
  @Inject(InjectionToken.GameInstanceQuery)
  gameInstanceQuery: GameInstanceQuery;

  async execute(query: GamesProgressQuery): Promise<GamesProgressResult> {
    return await this.gameInstanceQuery.gamesProgress(query);
  }
}
