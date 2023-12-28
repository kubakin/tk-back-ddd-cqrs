import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { AdminGame } from './game.schema';
import { CreateGameDto } from './dto/create.game.dto';
import { CommandBus } from '@nestjs/cqrs';
import { GameCreateCommand } from 'src/game/application/command/game.create/game.create.command';
import { generateString } from '@nestjs/typeorm';

@Resolver(() => AdminGame)
export class AdminGameResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
  ) {}

  @Query(() => [AdminGame])
  async admin_game_list() {
    return await this.provider.gameRepository.find();
  }

  @Mutation(() => String)
  async create_game(@Args('dto') dto: CreateGameDto) {
    await this.commandBus.execute(
      new GameCreateCommand({
        id: generateString(),
        ...dto,
      }),
    );
    return 'ok';
  }
}
