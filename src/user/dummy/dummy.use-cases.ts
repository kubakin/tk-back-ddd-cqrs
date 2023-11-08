import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectionToken } from '../application/injection.token';
import { UserFactory } from '../domain/user.factory';
import { generateString } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterCommand } from '../application/command/user.register/user.register.command';
import { UserDummyRepositoryInterface } from './user.dummy.repository.interface';
import { UserDeleteCommand } from '../application/command/user.delete/user.delete.command';

@Injectable()
export class DummyUseCases {
  readonly logger = new Logger('Dummy user');
  @Inject(InjectionToken.UserRepository)
  repository: UserDummyRepositoryInterface;

  constructor(private factory: UserFactory, private commandBus: CommandBus) {}

  async onApplicationBootstrap() {
    this.logger.debug('Prepare dummy mode');
    setTimeout(() => {
      this.main();
    }, 1000);
  }

  async main() {
    await this.clear();
    await this.createUser();
  }

  async clear() {
    this.logger.debug('Dummy users clean starting');
    const userIds = await this.repository.findDummyUsersIds();
    await Promise.all(
      userIds.map(async (id) => {
        await this.commandBus.execute(new UserDeleteCommand({ id }));
      }),
    );
  }

  async createUser() {
    this.logger.debug('Dummy creating user start');
    await this.commandBus.execute(
      new UserRegisterCommand({
        id: generateString(),
        name: `dummy_${generateString()}`,
        phone: generateString(),
      }),
    );
  }
}
