import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppGenericModule } from '../lib/app.generic.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import { GameModule } from './game/game.module';
import { GameInstanceModule } from './game-instance/game-instance.module';

@Module({
  imports: [
    AppGenericModule.forRoot(),
    UserModule,
    TeamModule,
    TaskModule,
    GameModule,
    GameInstanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
