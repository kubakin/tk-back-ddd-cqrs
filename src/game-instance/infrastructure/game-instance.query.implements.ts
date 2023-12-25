import { GameInstanceEntity } from './game-instance.entity';
import { GameInstanceQuery } from '../application/query/game-instance.query';
import { Injectable } from '@nestjs/common';
import { readConnection } from '../../../lib/db.module';
import { UserEntity } from '../../user/infrastructure/user.entity';
import { TeamEntity } from '../../team/infrastructure/team.entity';

import { generateString } from '@nestjs/typeorm';
import { GameInstanceListQuery } from '../application/query/game.instance.list/game.instance.list.query';
import {
  Game,
  GameInstanceListItem,
  GameInstanceListResult,
  Task,
  TaskInstance,
  Team,
} from '../application/query/game.instance.list/game.instance.list.result';
import { TaskInstanceEntity } from '../../task-instance/infrastructure/task-instance.entity';
import { TaskEntity } from '../../task/infrastructure/task.entity';
import { GameEntity } from '../../game/infrastructure/game.entity';
import { TeamInstancesListQuery } from '../application/query/team.instanses/team.instances.list.query';
import { TeamGameInstanceListItem } from '../application/query/team.instanses/team.instances.list.result';

@Injectable()
export class GameInstanceQueryImplements implements GameInstanceQuery {
  async gamesProgress(
    query: GameInstanceListQuery,
  ): Promise<GameInstanceListResult> {
    const rs = await this.gameInstanceRepo.find();
    const instances: GameInstanceListItem[] = await Promise.all(
      rs.map(async (it) => {
        return {
          id: it.id,
          score: it.score,
          status: it.status,
          game: await this.game(it.gameId),
          team: await this.team(it.teamId),
          tasks: await this.tasksInstances(it.id),
        };
      }),
    );
    return { data: instances };
  }

  async existTeamGamesList(query: TeamInstancesListQuery) {
    const rs = await this.gameInstanceRepo.find({
      where: { teamId: query.teamId },
    });
    const instances: TeamGameInstanceListItem[] = await Promise.all(
      rs.map(async (it) => {
        return {
          id: it.id,
          score: it.score,
          status: it.status,
          game: await this.game(it.gameId),
        };
      }),
    );
    return { data: instances };
  }

  get userRepo() {
    return readConnection.getRepository(UserEntity);
  }

  private async tasksInstances(instanceId: string): Promise<TaskInstance[]> {
    const list = await this.taskInstanceRepo.find({
      where: { gameInstanceId: instanceId },
    });
    return await Promise.all(
      list.map(async (it) => {
        return {
          id: generateString(),
          order: 1,
          status: it.status,
          helpStatus: it.helpStatus,
          attempts: [],
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

  private async game(gameId: string): Promise<Game> {
    const team = await this.gameRepo.findOneBy({ id: gameId });
    return {
      id: team.id,
      name: team.name,
    };
  }

  private async team(teamId: string): Promise<Team> {
    const team = await this.teamRepo.findOneBy({ id: teamId });
    return {
      id: team.id,
      name: team.name,
    };
  }

  get teamRepo() {
    return readConnection.getRepository(TeamEntity);
  }

  get gameRepo() {
    return readConnection.getRepository(GameEntity);
  }

  get gameInstanceRepo() {
    return readConnection.getRepository(GameInstanceEntity);
  }

  get taskRepo() {
    return readConnection.getRepository(TaskEntity);
  }

  get taskInstanceRepo() {
    return readConnection.getRepository(TaskInstanceEntity);
  }
}
