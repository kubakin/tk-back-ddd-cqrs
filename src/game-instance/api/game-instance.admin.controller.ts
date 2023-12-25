import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GameInstanceListQuery } from '../application/query/game.instance.list/game.instance.list.query';

@Controller('admin/game-instance')
export class GameInstanceAdminController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('')
  async list() {
    return await this.queryBus.execute(new GameInstanceListQuery());
  }
}
