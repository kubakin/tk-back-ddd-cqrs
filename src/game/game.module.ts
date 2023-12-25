import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GameFactory } from './domain/game.factory';
import { GameRepositoryImplements } from './infrastructure/game.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { GameDummyRepositoryImplements } from './dummy/game.dummy.repository.implements';
import { DummyUseCases } from './dummy/dummy.use-cases';
import { GameCreateHandler } from './application/command/game.create/game.create.handler';
import { GameUpdateHandler } from './application/command/game.update/game.update.handler';
import { UserGameResolver } from './api/user/game.resolver';
import { RepoProvider } from '../common/repo.provider';

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

const resolvers = [UserGameResolver];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [
    ...application,
    GameFactory,
    ...infrastructure,
    RepoProvider,
    DummyUseCases,
    ...resolvers,
  ],
  exports: [GameFactory, ...infrastructure],
})
export class GameModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
