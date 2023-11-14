import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GameInstanceFactory } from './domain/game-instance.factory';
import { GameInstanceRepositoryImplements } from './infrastructure/game-instance.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TeamJoinRequestedHandler } from './application/event/team.join.requested.handler';
import { GameRepositoryImplements } from '../game/infrastructure/game.repository.implements';
import { GamesProgressHandler } from './application/query/games.progress/games.progress.handler';
import { GameInstanceQueryImplements } from './infrastructure/game-instance.query.implements';
import { GameInstanceAdminController } from './api/game-instance.admin.controller';

const application = [TeamJoinRequestedHandler, GamesProgressHandler];

const infrastructure = [
  {
    provide: InjectionToken.GameInstanceRepository,
    useClass: GameInstanceRepositoryImplements,
  },
  {
    provide: InjectionToken.GameInstance,
    useClass: GameRepositoryImplements,
  },
  {
    provide: InjectionToken.GameInstanceQuery,
    useClass: GameInstanceQueryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, GameInstanceFactory, ...infrastructure],
  controllers: [GameInstanceAdminController],
})
export class GameInstanceModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
