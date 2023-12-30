import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GameInstanceFactory } from './domain/game-instance.factory';
import { GameInstanceRepositoryImplements } from './infrastructure/game-instance.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TeamJoinRequestedHandler } from './application/event/team.join.requested.handler';
import { GameInstanceQueryImplements } from './infrastructure/game-instance.query.implements';
import { GameInstanceAdminController } from './api/game-instance.admin.controller';
import { GameFactory } from '../game/domain/game.factory';
import { GameModule } from '../game/game.module';
import { GameInstanceListHandler } from './application/query/game.instance.list/game.instance.list.handler';
import { UserGameInstanceResolver } from './api/user/game-instance.resolver';
import { RepoProvider } from '../common/repo.provider';
import { AdminGameInstanceResolver } from './api/admin/game-instance.resolver';

const application = [TeamJoinRequestedHandler, GameInstanceListHandler];

const infrastructure = [
  {
    provide: InjectionToken.GameInstanceRepository,
    useClass: GameInstanceRepositoryImplements,
  },
  {
    provide: InjectionToken.GameInstanceQuery,
    useClass: GameInstanceQueryImplements,
  },
];

const resolvers = [UserGameInstanceResolver, AdminGameInstanceResolver];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule, GameModule],
  providers: [
    ...application,
    GameInstanceFactory,
    ...infrastructure,
    GameFactory,
    ...resolvers,
    RepoProvider,
  ],
  controllers: [GameInstanceAdminController],
})
export class GameInstanceModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
