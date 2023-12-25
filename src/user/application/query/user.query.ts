import { UserListResult } from './user.list/user.list.result';
import { UserListQuery } from './user.list/user.list.query';
import { MeResult } from './me/me.result';
import { MeQuery } from './me/me.query';

export interface UserQuery {
  userList: (query: UserListQuery) => Promise<UserListResult>;
  me: (query: MeQuery) => Promise<MeResult>;
}
