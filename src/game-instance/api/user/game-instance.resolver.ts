import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { UserTeam } from '../../../team/api/user/team.schema';
import { UserGameInstance } from './game-instance.schema';
import { UserGame } from '../../../game/api/user/game.schema';
import { UserId } from 'lib/authorization/src/jwt/user-id.decorator';
import { GqlUserId } from 'lib/authorization/src/jwt/user-id.gql.decorator';
import { In } from 'typeorm';
import { UserTaskInstance } from 'src/task-instance/api/user/task-instance.schema';

@Resolver(() => UserGameInstance)
export class UserGameInstanceResolver {
  constructor(private provider: RepoProvider) {}

  @Query(() => [UserGameInstance])
  async user_game_instance_list(@GqlUserId() userId: string) {
    const user = await this.provider.userRepository.findOne({
      where: { id: userId },
    });
    const team = await this.provider.teamRepository.findOne({
      where: { createdBy: userId, id: user.teamId },
      order: { createdAt: 'DESC' },
    });
    return await this.provider.gameInstanceRepository.find({
      where: {
        teamId: team.id,
        status: In(['Created', 'Process', 'Finished', 'Started', 'Approved']),
      },
    });
  }

  @ResolveField(() => UserTeam)
  async team(@Parent() instance: UserGameInstance) {
    return await this.provider.teamRepository.findOne({
      where: { id: instance.teamId },
    });
  }

  @ResolveField(() => UserGame)
  async game(@Parent() instance: UserGameInstance) {
    return await this.provider.gameRepository.findOne({
      where: { id: instance.gameId },
    });
  }

  @ResolveField(() => UserTaskInstance)
  async currentTask(@Parent() instance: UserGameInstance) {
    if (!instance.currentTaskId) return null;
    return await this.provider.taskInstanceRepository.findOne({
      where: { id: instance.currentTaskId },
    });
  }

  @ResolveField(() => Number)
  async totalTasks(@Parent() instance: UserGameInstance) {
    return await this.provider.taskInstanceRepository.count({
      where: { gameInstanceId: instance.id },
    });
  }

  @ResolveField(() => Number)
  async progressTasks(@Parent() instance: UserGameInstance): Promise<number> {
    return await this.provider.taskInstanceRepository.count({
      where: { gameInstanceId: instance.id, status: In(['Success', 'Voided']) },
    });
  }

  @Subscription(() => UserGameInstance)
  async userGameInstanceUpdated(@Context() context) {
    return context.pubSub.asyncIterator('gameInstanceUpdated');
  }
}
