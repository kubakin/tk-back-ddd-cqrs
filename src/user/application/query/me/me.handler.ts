import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserQuery } from '../user.query';
import { MeResult } from './me.result';
import { MeQuery } from './me.query';

@QueryHandler(MeQuery)
export class MeHandler implements IQueryHandler<MeQuery, MeResult> {
  @Inject(InjectionToken.UserQuery) userQuery: UserQuery;

  async execute(query: MeQuery): Promise<MeResult> {
    return await this.userQuery.me(query);
  }
}
