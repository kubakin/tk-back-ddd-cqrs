import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { GameInstanceQuery } from '../game-instance.query';
import { GameInstanceListResult } from './game.instance.list.result';
import { GameInstanceListQuery } from './game.instance.list.query';

@QueryHandler(GameInstanceListQuery)
export class GameInstanceListHandler
  implements IQueryHandler<GameInstanceListQuery, GameInstanceListResult>
{
  @Inject(InjectionToken.GameInstanceQuery)
  gameInstanceQuery: GameInstanceQuery;

  async execute(query: GameInstanceListQuery): Promise<GameInstanceListResult> {
    return await this.gameInstanceQuery.gamesProgress(query);
  }
}
