import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { CommandBus } from '@nestjs/cqrs';
import { GameCreateCommand } from 'src/game/application/command/game.create/game.create.command';
import { generateString } from '@nestjs/typeorm';
import { GameUpdateCommand } from 'src/game/application/command/game.update/game.update.command';
import { UserTaskInstance } from './task-instance.schema';

@Resolver(() => UserTaskInstance)
export class UserTaskInstanceResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
  ) {}

  // @Query(() => [AdminGame])
  // async admin_game_list() {
  //   return await this.provider.gameRepository.find();
  // }

  // @Query(() => AdminGame)
  // async admin_game(@Args('id') id: string) {
  //   return await this.provider.gameRepository.findOne({ where: { id } });
  // }

  // @Mutation(() => String)
  // async create_game(@Args('dto') dto: CreateUpdateGameDto) {
  //   await this.commandBus.execute(
  //     new GameCreateCommand({
  //       id: generateString(),
  //       ...dto,
  //     }),
  //   );
  //   return 'ok';
  // }

  // @Mutation(() => String)
  // async update_game(
  //   @Args('id') id: string,
  //   @Args('dto') dto: CreateUpdateGameDto,
  // ) {
  //   await this.commandBus.execute(
  //     new GameUpdateCommand({
  //       id,
  //       ...dto,
  //     }),
  //   );
  //   return 'ok';
  // }
}
