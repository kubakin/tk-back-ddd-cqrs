import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { CommandBus } from '@nestjs/cqrs';
import { GameCreateCommand } from 'src/game/application/command/game.create/game.create.command';
import { generateString } from '@nestjs/typeorm';
import { GameUpdateCommand } from 'src/game/application/command/game.update/game.update.command';
import { AdminTaskInstance } from './task-instance.schema';
import { TaskCreateCommand } from 'src/task/application/command/task.create/task.create.command';
import { CreateUpdateTaskDto } from './dto/create-update.task.dto';
import { AdminTask } from 'src/task/api/admin/task.schema';

@Resolver(() => AdminTaskInstance)
export class AdminTaskInstanceResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
  ) {}

  @Query(() => [AdminTaskInstance])
  async admin_task_instance_list() {
    return await this.provider.taskRepository.find();
  }

  @ResolveField(()=> AdminTask)
  async task(@Parent() instance: AdminTaskInstance) {
    return await this.provider.taskRepository.findOne({where: {id: instance.taskId}});
  }

  @Mutation(() => String)
  async approve_task(@Args('id') id: string) {
    // await this.commandBus.execute(
    //   new TaskCreateCommand({
    //     id: generateString(),
    //     ...dto,
    //   }),
    // );
    return 'ok';
  }
}
