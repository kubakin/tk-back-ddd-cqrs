import { Field, ObjectType, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@ObjectType()
export class Test {
  @Field()
  test: string;
}

@Resolver(() => Test)
export class AppResolver {
  constructor() {
  }

  @Query(() => Test)
  test123() {
    return "";
  }

  @Subscription(() => Test)
  async test() {
    return await pubSub.asyncIterator("TEST");
    // return this.appService.getHello();
  }
}
