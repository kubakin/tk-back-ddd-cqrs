import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GameFactory } from './domain/game.factory';
import { GameRepositoryImplements } from './infrastructure/game.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { GameCreateUpdateHandler } from './application/command/game.create-update/game.create-update.handler';
import { GameInstancePaidHandler } from './application/event/game-instance.paid.handler';

const application = [GameCreateUpdateHandler, GameInstancePaidHandler];

const infrastructure = [
  {
    provide: InjectionToken.GameRepository,
    useClass: GameRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, GameFactory, ...infrastructure],
})
export class GameModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
