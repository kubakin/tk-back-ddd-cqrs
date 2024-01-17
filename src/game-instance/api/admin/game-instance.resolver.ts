import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { UserTeam } from '../../../team/api/user/team.schema';
import { AdminGameInstance } from './game-instance.schema';
import { UserGame } from '../../../game/api/user/game.schema';
import { UserId } from 'lib/authorization/src/jwt/user-id.decorator';
import { GqlUserId } from 'lib/authorization/src/jwt/user-id.gql.decorator';
import { AdminGameInstanceQuery } from './game-instance.input';
import { AdminTeam } from 'src/team/api/admin/team.schema';
import { AdminGame } from 'src/game/api/admin/game.schema';
import { AdminTaskInstance } from 'src/task-instance/api/admin/task-instance.schema';
import { CommandBus } from '@nestjs/cqrs';
import { RejectGameCommand } from 'src/game-instance/application/command/reject.game/reject.game.command';
import { ApproveGameCommand } from 'src/game-instance/application/command/approve.game/approve.game.command';
import { SkipThrottle } from '@nestjs/throttler';

@Resolver(() => AdminGameInstance)
@SkipThrottle()
export class AdminGameInstanceResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
  ) {}

  @Query(() => [AdminGameInstance])
  async admin_game_instance_list(@Args('dto') dto: AdminGameInstanceQuery) {
    return await this.provider.gameInstanceRepository.find({ where: dto });
  }

  @ResolveField(() => AdminTeam)
  async team(@Parent() instance: AdminGameInstance) {
    return await this.provider.teamRepository.findOne({
      where: { id: instance.teamId },
    });
  }

  @ResolveField(() => AdminGame)
  async game(@Parent() instance: AdminGameInstance) {
    return await this.provider.gameRepository.findOne({
      where: { id: instance.gameId },
      order: { createdAt: 'ASC' },
    });
  }

  @ResolveField(() => [AdminTaskInstance])
  async taskInstances(@Parent() instance: AdminGameInstance) {
    return await this.provider.taskInstanceRepository.find({
      where: { gameInstanceId: instance.id },
      order: { order: 'ASC' },
    });
  }

  @Mutation(() => String)
  async appove_game_instance(@Args('id') id: string) {
    await this.commandBus.execute(
      new ApproveGameCommand({ gameInstanceId: id }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  async reject_game_instance(@Args('id') id: string) {
    await this.commandBus.execute(
      new RejectGameCommand({ gameInstanceId: id }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  async release_game_instance(@Args('id') id: string) {
    await this.commandBus.execute(
      new RejectGameCommand({ gameInstanceId: id }),
    );
    return 'ok';
  }

  // @Subscription(() => AdminGameInstance)
  // async userGameInstanceUpdated(@Context() context) {
  //   return context.pubSub.asyncIterator('gameInstanceUpdated');
  // }
}
