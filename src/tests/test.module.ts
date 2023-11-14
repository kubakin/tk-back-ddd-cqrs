import { Module } from '@nestjs/common';
import { RegisterLogin } from './register-login';
import { HttpModule } from '@nestjs/axios';
import { Executor } from './executor';
import { TeamTest } from './team-test';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [RegisterLogin, TeamTest, Executor],
})
export class TestModule {}
