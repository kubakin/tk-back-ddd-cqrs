import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { CommandBus } from '@nestjs/cqrs';
import { GameCreateCommand } from 'src/game/application/command/game.create/game.create.command';
import { generateString } from '@nestjs/typeorm';
import { GameUpdateCommand } from 'src/game/application/command/game.update/game.update.command';
import { AdminTask } from './task.schema';
import { TaskCreateCommand } from 'src/task/application/command/task.create/task.create.command';
import { CreateUpdateTaskDto } from './dto/create-update.task.dto';
import { AdminGame } from 'src/game/api/admin/game.schema';
import { TaskInputDto } from './task.input';

@Resolver(() => AdminTask)
export class AdminTaskResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
  ) {}

  @Query(() => [AdminTask])
  async admin_task_list(@Args('dto') dto: TaskInputDto) {
    return await this.provider.taskRepository.find({ where: dto });
  }

  @ResolveField(() => AdminGame)
  async game(@Parent() task: AdminTask) {
    return await this.provider.gameRepository.findOne({
      where: { id: task.gameId },
    });
  }

  @Mutation(() => String)
  async create_task(@Args('dto') dto: CreateUpdateTaskDto) {
    await this.commandBus.execute(
      new TaskCreateCommand({
        id: generateString(),
        ...dto,
      }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  async update_task(
    @Args('id') id: string,
    @Args('dto') dto: CreateUpdateTaskDto,
  ) {
    // await this.commandBus.execute(
    //   new TaskCreateCommand({
    //     id,
    //     ...dto,
    //   }),
    // );
    return 'ok';
  }

  @Mutation(() => String)
  async delete_task(@Args('id') id: string) {
    // await this.commandBus.execute(
    //   new TaskCreateCommand({
    //     id,
    //     ...dto,
    //   }),
    // );
    return 'ok';
  }
}
