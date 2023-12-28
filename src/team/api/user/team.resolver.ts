import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { UserTeam } from './team.schema';
import { CommandBus } from '@nestjs/cqrs';
import { TeamChangeSessionCommand } from '../../application/command/team.change.session/team.change.session.command';
import { GqlUserId } from '../../../../lib/authorization/src/jwt/user-id.gql.decorator';
import { UserGameInstance } from '../../../game-instance/api/user/game-instance.schema';
import { PubSub } from 'graphql-subscriptions';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamCreateCommand } from '../../application/command/team.create/team.create.command';
import { generateString } from '@nestjs/typeorm';
import { TeamStartGameCommand } from 'src/team/application/command/team.start.game/team.start.game.command';

const pubSub = new PubSub();

@Resolver(() => UserTeam)
export class UserTeamResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
  ) {}

  @Mutation(() => String)
  async changeSession(@GqlUserId() userId: string, @Args('id') id: string) {
    await this.commandBus.execute(
      new TeamChangeSessionCommand({
        userId,
        gameInstanceId: id,
      }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  async createTeam(
    @GqlUserId() userId: string,
    @Args('dto') dto: CreateTeamDto,
  ) {
    await this.commandBus.execute(
      new TeamCreateCommand({
        id: generateString(),
        userId,
        name: dto.name,
      }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  async createSession(
    @GqlUserId() userId: string,
    @Args('gameId') gameId: string,
  ) {
    await this.commandBus.execute(
      new TeamStartGameCommand({
        id: generateString(),
        userId,
        gameId,
      }),
    );
    return 'ok';
  }

  @ResolveField(() => UserGameInstance)
  async gameSession(@Parent() team: UserTeam) {
    if (!team.currentSessionId) {
      return null;
    }
    const gameInstance = await this.provider.gameInstanceRepository.findOne({
      where: { id: team.currentSessionId },
    });
    return gameInstance;
  }
}
