import { Query, Resolver } from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { UserGame } from './game.schema';

@Resolver(() => UserGame)
export class UserGameResolver {
  constructor(private provider: RepoProvider) {}

  @Query(() => [UserGame])
  async user_game_list() {
    return await this.provider.gameRepository.find();
  }
}
