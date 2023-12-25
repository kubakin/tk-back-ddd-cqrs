import { Args, Context, Resolver, Subscription } from "@nestjs/graphql";
import { RepoProvider } from "../../../common/repo.provider";
import { PubSub } from "graphql-subscriptions";
import { Interval } from "@nestjs/schedule";

const pubSub = new PubSub();

@Resolver("test")
export class TestResolver {
  constructor(private provider: RepoProvider) {
  }


  @Interval(3000)
  async test() {
    await pubSub.publish("NEW_MESSAGE", "test");
  }

  @Subscription(() => String, {
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

}
