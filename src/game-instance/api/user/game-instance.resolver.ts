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

@Resolver(() => UserGameInstance)
export class UserGameInstanceResolver {
  constructor(private provider: RepoProvider) {}

  @Query(() => [UserGameInstance])
  async user_game_instance_list(@GqlUserId() userId: string) {
    const team = await this.provider.teamRepository.findOne({
      where: { createdBy: userId },
    });
    return await this.provider.gameInstanceRepository.find({
      where: { teamId: team.id },
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

  @Subscription(() => UserGameInstance)
  async userGameInstanceUpdated(@Context() context) {
    return context.pubSub.asyncIterator('gameInstanceUpdated');
  }
}
