import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GameFactory } from './domain/game.factory';
import { GameRepositoryImplements } from './infrastructure/game.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { GameInstanceModule } from '../game-instance/game-instance.module';
import { GameDummyRepositoryImplements } from './dummy/game.dummy.repository.implements';
import { DummyUseCases } from './dummy/dummy.use-cases';
import { GameCreateHandler } from './application/command/game.create/game.create.handler';
import { GameUpdateHandler } from './application/command/game.update/game.update.handler';

const application = [GameCreateHandler, GameUpdateHandler];

const infrastructure = [
  {
    provide: InjectionToken.GameRepository,
    useClass: GameRepositoryImplements,
  },
  {
    provide: InjectionToken.DummyGameRepository,
    useClass: GameDummyRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule, GameInstanceModule],
  providers: [...application, GameFactory, ...infrastructure, DummyUseCases],
})
export class GameModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
