import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { AdminTeam } from './team.schema';
import { CommandBus } from '@nestjs/cqrs';
import { TeamChangeSessionCommand } from '../../application/command/team.change.session/team.change.session.command';
import { GqlUserId } from '../../../../lib/authorization/src/jwt/user-id.gql.decorator';
import { UserGameInstance } from '../../../game-instance/api/user/game-instance.schema';
import { PubSub } from 'graphql-subscriptions';
import { TeamCreateCommand } from '../../application/command/team.create/team.create.command';
import { generateString } from '@nestjs/typeorm';
import { TeamStartGameCommand } from 'src/team/application/command/team.start.game/team.start.game.command';
import { AdminUser } from 'src/user/api/admin/user.schema';
import { AdminGameInstance } from 'src/game-instance/api/admin/game-instance.schema';

@Resolver(() => AdminTeam)
export class AdminTeamResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
  ) {}

  @Query(() => [AdminTeam])
  async team_list() {
    return await this.provider.teamRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  @Query(() => AdminTeam)
  async team_admin(@Args('id') id: string) {
    return await this.provider.teamRepository.findOne({ where: { id } });
  }

  @ResolveField(() => AdminUser)
  async admin(@Parent() team: AdminTeam) {
    return await this.provider.userRepository.findOne({
      where: { id: team.createdBy },
    });
  }

  @ResolveField(() => [AdminUser])
  async users(@Parent() team: AdminTeam) {
    return await this.provider.userRepository.find({
      where: { teamId: team.id },
    });
  }

  @ResolveField(() => AdminGameInstance)
  async gameSession(@Parent() team: AdminTeam) {
    if (!team.currentSessionId) {
      return null;
    }
    const gameInstance = await this.provider.gameInstanceRepository.findOne({
      where: { id: team.currentSessionId },
    });
    return gameInstance;
  }
}
