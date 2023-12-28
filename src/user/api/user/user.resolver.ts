import { Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { UserUser } from "./user.schema";
import { RepoProvider } from "../../../common/repo.provider";
import { UserTeam } from "../../../team/api/user/team.schema";
import { GqlUserId } from "../../../../lib/authorization/src/jwt/user-id.gql.decorator";
import { CommandBus } from "@nestjs/cqrs";
import { UserLeaveCommand } from "../../application/command/user.leave/user.leave.command";
import { UserJoinCommand } from "../../application/command/user.join/user.join.command";
import { generateString } from "@nestjs/typeorm";
import { pubSub } from "../../../app.module";


@Resolver(() => UserUser)
export class UserUserResolver {
  constructor(private provider: RepoProvider,
              private commandBus: CommandBus) {
  }

  @Query(() => [UserUser])
  async user_user_list() {
    return await this.provider.userRepository.find();
  }

  @Subscription(() => UserUser)
  userUpdated() {
    return pubSub.asyncIterator("userUpdated");
  }

  @Query(() => UserUser)
  async me(@GqlUserId() userId: string, @Context() ctx) {
    return await this.provider.userRepository.findOne({
      where: { id: userId }
    });
  }

  @Mutation(() => String)
  async leave(@GqlUserId() userId: string) {
    await this.commandBus.execute(new UserLeaveCommand({
      id: userId
    }));
    return "ok";
  }

  @Mutation(() => String)
  async join(@GqlUserId() userId: string) {
    await this.commandBus.execute(new UserJoinCommand({
      id: userId,
      teamId: generateString()
    }));
    return "ok";
  }

  @ResolveField(() => UserTeam)
  async team(@Parent() user: UserUser) {
    if (!user.teamId) {
      return null;
    }
    return await this.provider.teamRepository.findOne({
      where: { id: user.teamId }
    });
  }
}
