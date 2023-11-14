import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GamesProgressQuery } from '../application/query/games.progress/games.progress.query';

@Controller('admin/game-instance')
export class GameInstanceAdminController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('progress')
  async progressList() {
    return await this.queryBus.execute(new GamesProgressQuery());
  }
}
