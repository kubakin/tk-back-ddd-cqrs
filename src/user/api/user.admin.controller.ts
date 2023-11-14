import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthService } from '../../../lib/authorization/src/api/auth.service';
import { UserListQuery } from '../application/query/user.list/user.list.query';

@Controller('admin/user')
export class UserAdminController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private authService: AuthService,
  ) {}

  @Get()
  async userList() {
    return await this.queryBus.execute(new UserListQuery());
  }
}
