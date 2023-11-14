import { UserListResult } from './user.list/user.list.result';
import { UserListQuery } from './user.list/user.list.query';

export interface UserQuery {
  userList: (query: UserListQuery) => Promise<UserListResult>;
}
