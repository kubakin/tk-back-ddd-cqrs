import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AppGenericModule } from "../lib/app.generic.module";
import { TeamModule } from "./team/team.module";
import { AttemptModule } from "./attempts/attempt.module";
import { TestModule } from "./tests/test.module";
import { TaskInstanceModule } from "./task-instance/task-instance.module";
import { GameInstanceModule } from "./game-instance/game-instance.module";
import { ChatModule } from "./chat/chat.module";
import { AdminModule } from "./admin/admin.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PubSub } from "graphql-subscriptions";
import { ScheduleModule } from "@nestjs/schedule";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

const pubSub = new PubSub();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AppGenericModule.forRoot(),
    UserModule,
    TeamModule,
    TaskInstanceModule,
    GameInstanceModule,
    // TaskModule,
    // GameModule,
    AttemptModule,
    TestModule,
    // GatewaysModule,
    ChatModule,
    AdminModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: (ctx) => {
        ctx.pubSub = pubSub;
        return ctx;
      },
      subscriptions: {
        "graphql-ws": {
          path: "/graphql"
        }
        // "subscriptions-transport-ws": true
      },
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
