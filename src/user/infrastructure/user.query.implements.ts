import { UserEntity } from './user.entity';
import { readConnection } from '../../../lib/db.module';
import { Injectable } from '@nestjs/common';
import { UserQuery } from '../application/query/user.query';
import { UserListQuery } from '../application/query/user.list/user.list.query';
import {
  UserListItem,
  UserListResult,
  UserTeam,
} from '../application/query/user.list/user.list.result';
import { TeamEntity } from '../../team/infrastructure/team.entity';
import { MeQuery } from '../application/query/me/me.query';
import { MeResult } from '../application/query/me/me.result';

@Injectable()
export class UserQueryImplements implements UserQuery {
  async userList(query: UserListQuery): Promise<UserListResult> {
    const rs = await this.userRepo.find();
    const users: UserListItem[] = await Promise.all(
      rs.map(async (it) => {
        return {
          id: it.id,
          phone: it.phone,
          team: await this.team(it.teamId),
        };
      }),
    );
    return { data: users };
  }

  async me(query: MeQuery): Promise<MeResult> {
    const rs = await this.userRepo.findOne({ where: { id: query.userId } });
    console.log(rs);

    return {
      id: rs.id,
      phone: rs.phone,
      team: await this.team(rs.teamId),
    };
  }

  get userRepo() {
    return readConnection.getRepository(UserEntity);
  }

  private async team(teamId: string): Promise<UserTeam | null> {
    const team = await this.teamRepo.findOneBy({ id: teamId });
    if (!team) return null;
    return {
      id: team.id,
      name: team.name,
    };
  }

  get teamRepo() {
    return readConnection.getRepository(TeamEntity);
  }
}
