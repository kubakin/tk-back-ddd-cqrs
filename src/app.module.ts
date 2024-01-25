import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppGenericModule } from '../lib/app.generic.module';
import { TeamModule } from './team/team.module';
import { AttemptModule } from './attempts/attempt.module';
import { TestModule } from './tests/test.module';
import { TaskInstanceModule } from './task-instance/task-instance.module';
import { GameInstanceModule } from './game-instance/game-instance.module';
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PubSub } from 'graphql-subscriptions';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './common/guards/gql.throttler';
import { AuthorizationOnlyModule } from 'lib/authorization/src';
import { JwtService } from '@nestjs/jwt';
import { GqlWsUserGuard } from 'lib/authorization/src/gql.user.guard';
import { NotificationModule } from './notification/notification.module';
export const pubSub = new PubSub();

@Module({
  imports: [
    AuthorizationOnlyModule,
    ThrottlerModule.forRoot([
      {
        ttl: 20000,
        limit: 20,
      },
    ]),
    ScheduleModule.forRoot(),
    AppGenericModule.forRoot(),
    UserModule,
    TeamModule,
    TaskInstanceModule,
    GameInstanceModule,
    AttemptModule,
    TestModule,
    ChatModule,
    NotificationModule,
    AdminModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [GqlWsUserGuard],
      useFactory: (guard: GqlWsUserGuard) => {
        return {
          useGlobalPrefix: true,
          // cors: {
          //   credentials: true,
          //   origin: true,
          // },
          autoSchemaFile: true,
          playground: false,
          context: ({ req, res }) => {
            return { req, res, pubSub };
          },
          introspection: true,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          subscriptions: {
            'graphql-ws': {
              onSubscribe(ctx, message) {
                const user = guard.decodeUser(ctx.connectionParams?.headers);
                ctx.extra.user = user;
                const additional = ctx.connectionParams?.headers || {};
                Object.assign(ctx.extra['request'].headers, additional);
              },
              path: '/api/sub',
            },
          },
        };
      },
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    //   playground: false,
    //   context: ({ req, res }) => {
    //     return { req, res, pubSub };
    //   },
    //   introspection: true,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   subscriptions: {
    //     'graphql-ws': {
    //       onSubscribe(ctx, message) {
    //         const additional = ctx.connectionParams?.headers || {};
    //         Object.assign(ctx.extra['request'].headers, additional);
    //         // console.log(ctx.extra['request'].headers);
    //       },
    //       path: '/sub',
    //     },
    //   },
    // }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
