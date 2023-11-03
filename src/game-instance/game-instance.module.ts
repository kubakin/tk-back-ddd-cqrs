import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GameInstanceFactory } from './domain/game-instance.factory';
import { GameInstanceRepositoryImplements } from './infrastructure/game-instance.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { TeamJoinRequestedHandler } from './application/event/team.join.requested.handler';
import { GameRepositoryImplements } from '../game/infrastructure/game.repository.implements';

const application = [TeamJoinRequestedHandler];

const infrastructure = [
  {
    provide: InjectionToken.GameInstanceRepository,
    useClass: GameInstanceRepositoryImplements,
  },
  {
    provide: InjectionToken.GameInstance,
    useClass: GameRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, GameInstanceFactory, ...infrastructure],
})
export class GameInstanceModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
