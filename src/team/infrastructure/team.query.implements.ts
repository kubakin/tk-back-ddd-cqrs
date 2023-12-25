import { readConnection } from '../../../lib/db.module';
import { Injectable } from '@nestjs/common';

import { TeamEntity } from '../../team/infrastructure/team.entity';
import { TeamQuery } from '../application/query/team.query';
import { TeamListQuery } from '../application/query/team.list/team.list.query';
import {
  TeamListItem,
  TeamListResult,
  TeamUser,
} from '../application/query/team.list/team.list.result';
import { UserEntity } from '../../user/infrastructure/user.entity';

@Injectable()
export class TeamQueryImplements implements TeamQuery {
  async teamList(query: TeamListQuery): Promise<TeamListResult> {
    const rs = await this.userRepo.find();
    const teams: TeamListItem[] = await Promise.all(
      rs.map(async (it) => {
        return {
          id: it.id,
          name: it.name,
          users: await this.teamUsers(it.teamId),
        };
      }),
    );
    return { data: teams };
  }

  get userRepo() {
    return readConnection.getRepository(UserEntity);
  }

  private async teamUsers(teamId: string): Promise<TeamUser[]> {
    const users = await this.userRepo.find({ where: { teamId } });
    return users;
  }

  get teamRepo() {
    return readConnection.getRepository(TeamEntity);
  }
}
