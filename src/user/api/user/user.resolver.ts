import { Args, Context, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { UserUser } from "./user.schema";
import { RepoProvider } from "../../../common/repo.provider";
import { UserTeam } from "../../../team/api/user/team.schema";
import { GqlUserId } from "../../../../lib/authorization/src/jwt/user-id.gql.decorator";
import { PubSub } from "graphql-subscriptions";
import { Interval } from "@nestjs/schedule";
import { PubSubAsyncIterator } from "graphql-subscriptions/dist/pubsub-async-iterator";

const pubSub = new PubSub();

@Resolver(() => UserUser)
export class UserUserResolver {
  constructor(private provider: RepoProvider) {
  }

  @Query(() => [UserUser])
  async user_user_list() {
    return await this.provider.userRepository.find();
  }

  @Interval(3000)
  async test() {
    await pubSub.publish("NEW_MESSAGE", "test");
  }

  @Subscription(() => PubSubAsyncIterator, {
    name: "newMessage"
  })
  newMessage(@Args("id") id: string, @Context() ctx) {
    console.log(ctx);
    console.log("suka");
    return ctx.pubSub.asyncIterator("newMessage");
    return {
      subscribe: () => pubSub.asyncIterator("newMessage")
    };
  }

  //
  // @Subscription(returns => String)
  // async newMessage(@Args("id") id: string, @Context() ctx) {
  //   console.log(ctx);
  //   const test = await ctx.pubSub.asyncIterator("NEW_MESSAGE");
  //   return test;
  //   console.log(isAsyncIterable(test));
  //   return {
  //     ...test,
  //     return: (t) => {
  //       console.log(t, "shit");
  //       return test.return("shit");
  //     }
  //
  //   };
  //   return test;
  //   return {
  //     subscribe: () => pubSub.asyncIterator("NEW_MESSAGE")
  //   };
  // }

  @Query(() => UserUser)
  async me(@GqlUserId() userId: string, @Context() ctx) {
    return await this.provider.userRepository.findOne({
      where: { id: userId }
    });
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
