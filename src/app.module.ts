import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppGenericModule } from '../lib/app.generic.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import { GameModule } from './game/game.module';
import { AttemptModule } from './attempts/attempt.module';
import { TestModule } from './tests/test.module';

@Module({
  imports: [
    AppGenericModule.forRoot(),
    UserModule,
    TeamModule,
    TaskModule,
    GameModule,
    AttemptModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
