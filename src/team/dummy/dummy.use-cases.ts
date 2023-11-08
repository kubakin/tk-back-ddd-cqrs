import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectionToken } from '../application/injection.token';
import { generateString } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { TeamDeleteCommand } from '../application/command/team.delete/team.delete.command';
import { TeamCreateCommand } from '../application/command/team.create/team.create.command';
import { TeamDummyRepositoryImplements } from './team.dummy.repository.implements';

@Injectable()
export class DummyUseCases {
  readonly logger = new Logger('Dummy team');
  @Inject(InjectionToken.TeamRepositoryDummy)
  repository: TeamDummyRepositoryImplements;

  constructor(private commandBus: CommandBus) {}

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
    this.logger.debug('clean starting');
    const teamIds = await this.repository.findDummyTeamIds();
    await Promise.all(
      teamIds.map(async (id) => {
        await this.commandBus.execute(new TeamDeleteCommand({ id }));
      }),
    );
  }

  async createUser() {
    this.logger.debug('creating  start');
    await this.commandBus.execute(
      new TeamCreateCommand({
        id: generateString(),
        name: `dummy_${generateString()}`,
        userId: generateString(),
      }),
    );
  }
}
