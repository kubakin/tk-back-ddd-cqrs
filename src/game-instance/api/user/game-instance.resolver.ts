import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { UserTeam } from '../../../team/api/user/team.schema';
import { UserGameInstance } from './game-instance.schema';
import { UserGame } from '../../../game/api/user/game.schema';

@Resolver(() => UserGameInstance)
export class UserGameInstanceResolver {
  constructor(private provider: RepoProvider) {}

  @Query(() => [UserGameInstance])
  async user_game_instance_list() {
    return await this.provider.gameInstanceRepository.find();
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
}
