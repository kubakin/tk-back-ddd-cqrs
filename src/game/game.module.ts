import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GameFactory } from './domain/game.factory';
import { GameRepositoryImplements } from './infrastructure/game.repository.implements';
import { InjectionToken } from './application/injection.token';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { GameCreateUpdateHandler } from './application/command/game.create-update/game.create-update.handler';
import { GameInstanceModule } from '../game-instance/game-instance.module';

const application = [GameCreateUpdateHandler];

const infrastructure = [
  {
    provide: InjectionToken.GameRepository,
    useClass: GameRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule, GameInstanceModule],
  providers: [...application, GameFactory, ...infrastructure],
})
export class GameModule {
  constructor() {
    // console.log(process.env.JWT_SECRET);
  }
}
