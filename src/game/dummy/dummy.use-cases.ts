import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectionToken } from '../application/injection.token';
import { CommandBus } from '@nestjs/cqrs';
import { GameDummyRepositoryImplements } from './game.dummy.repository.implements';
import { generateString } from '@nestjs/typeorm';
import { GameCreateCommand } from '../application/command/game.create/game.create.command';

@Injectable()
export class DummyUseCases {
  readonly logger = new Logger('Dummy game');
  @Inject(InjectionToken.DummyGameRepository)
  repository: GameDummyRepositoryImplements;

  constructor(private commandBus: CommandBus) {}

  async onApplicationBootstrap() {
    return;
    this.logger.debug('Prepare dummy mode');
    setTimeout(() => {
      this.main();
    }, 1000);
  }

  async main() {
    // await this.clear();
    await this.createGame();
  }

  async clear() {
    // this.logger.debug('clean starting');
    // const teamIds = await this.repository.findDummyTeamIds();
    // await Promise.all(
    //   teamIds.map(async (id) => {
    //     await this.commandBus.execute(new TeamDeleteCommand({ id }));
    //   }),
    // );
  }

  async createGame() {
    this.logger.debug('creating  start');
    await this.commandBus.execute(
      new GameCreateCommand({
        id: generateString(),
        name: `dummy_${generateString()}`,
        hidden: false,
        description: 'test',
        logoUrl: 'test',
        duration: 10,
        taskStrategy: 'DEFAULT',
        cost: 0,
        rules: 'test',
        personLimit: 10,
      }),
    );
  }
}
