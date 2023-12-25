import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { RepoProvider } from "../../../common/repo.provider";
import { UserTeam } from "./team.schema";
import { CommandBus } from "@nestjs/cqrs";
import { TeamChangeSessionCommand } from "../../application/command/team.change.session/team.change.session.command";
import { GqlUserId } from "../../../../lib/authorization/src/jwt/user-id.gql.decorator";
import { UserGameInstance } from "../../../game-instance/api/user/game-instance.schema";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver(() => UserTeam)
export class UserTeamResolver {
  constructor(private provider: RepoProvider, private commandBus: CommandBus) {
  }

  @Mutation(() => String)
  async changeSession(@GqlUserId() userId: string, @Args("id") id: string) {
    const user = await this.provider.userRepository.findOne({
      where: { id: userId }
    });
    // await pubSub.publish('changeSession', { id: '' });
    await this.commandBus.execute(
      new TeamChangeSessionCommand({
        id: user.teamId,
        userId,
        gameInstanceId: id
      })
    );
    return "ok";
  }

  @ResolveField(() => UserGameInstance)
  async gameSession(@Parent() team: UserTeam) {
    if (!team.currentSessionId) {
      return null;
    }
    const gameInstance = await this.provider.gameInstanceRepository.findOne({
      where: { id: team.currentSessionId }
    });
    return gameInstance;
  }

}


