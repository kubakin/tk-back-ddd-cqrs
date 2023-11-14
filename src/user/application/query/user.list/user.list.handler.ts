import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserListQuery } from './user.list.query';
import { UserListResult } from './user.list.result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserQuery } from '../user.query';

@QueryHandler(UserListQuery)
export class UserListHandler
  implements IQueryHandler<UserListQuery, UserListResult>
{
  @Inject(InjectionToken.UserQuery) userQuery: UserQuery;

  async execute(query: UserListQuery): Promise<UserListResult> {
    return await this.userQuery.userList(query);
  }
}
