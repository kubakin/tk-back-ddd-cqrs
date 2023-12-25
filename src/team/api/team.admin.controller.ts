import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserGuard } from '../../../lib/authorization/src/user.guard';
import { TeamListQuery } from '../application/query/team.list/team.list.query';

@Controller('/admin/team')
@UserGuard()
export class TeamAdminController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async teamList() {
    return await this.queryBus.execute(new TeamListQuery());
  }
}
