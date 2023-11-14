import { Injectable } from '@nestjs/common';
import { RegisterLogin } from './register-login';
import { TeamTest } from './team-test';

@Injectable()
export class Executor {
  constructor(
    private registerLogin: RegisterLogin,
    private teamTest: TeamTest,
  ) {}

  async onApplicationBootstrap() {
    setTimeout(async () => {
      const { accessToken } = await this.registerLogin.main();
      await this.teamTest.main(accessToken);
    }, 1500);
  }
}
