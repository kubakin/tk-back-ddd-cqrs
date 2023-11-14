import { GameInstanceEntity } from './game-instance.entity';
import { GameInstanceQuery } from '../application/query/game-instance.query';
import { Injectable } from '@nestjs/common';
import { readConnection } from '../../../lib/db.module';
import { UserEntity } from '../../user/infrastructure/user.entity';
import { TeamEntity } from '../../team/infrastructure/team.entity';
import { GamesProgressQuery } from '../application/query/games.progress/games.progress.query';
import {
  GameProgressItem,
  GamesProgressResult,
  Task,
  TaskInstance,
  Team,
} from '../application/query/games.progress/games.progress.result';
import { generateString } from '@nestjs/typeorm';

@Injectable()
export class GameInstanceQueryImplements implements GameInstanceQuery {
  async gamesProgress(query: GamesProgressQuery): Promise<GamesProgressResult> {
    const rs = await this.gameInstanceRepo.find();
    const instances: GameProgressItem[] = await Promise.all(
      rs.map(async (it) => {
        return {
          id: it.id,
          team: await this.team(it.teamId),
          tasks: await this.tasksInstances(it.id),
        };
      }),
    );
    return { data: instances };
  }

  get userRepo() {
    return readConnection.getRepository(UserEntity);
  }

  private async team(teamId: string): Promise<Team> {
    const team = await this.teamRepo.findOneBy({ id: teamId });
    return {
      id: team.id,
      name: team.name,
    };
  }

  private async tasksInstances(instanceId: string): Promise<TaskInstance[]> {
    return await Promise.all(
      Array(10)
        .fill(0)
        .map(async (it) => {
          return {
            id: generateString(),
            order: 1,
            task: await this.task(generateString()),
          };
        }),
    );
  }

  private async task(taskId: string): Promise<Task> {
    return {
      id: generateString(),
    };
  }

  get teamRepo() {
    return readConnection.getRepository(TeamEntity);
  }

  get gameInstanceRepo() {
    return readConnection.getRepository(GameInstanceEntity);
  }
}
