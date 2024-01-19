import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { UserUser } from './user.schema';
import { RepoProvider } from '../../../common/repo.provider';
import { UserTeam } from '../../../team/api/user/team.schema';
import { GqlUserId } from '../../../../lib/authorization/src/jwt/user-id.gql.decorator';
import { CommandBus } from '@nestjs/cqrs';
import { UserLeaveCommand } from '../../application/command/user.leave/user.leave.command';
import { UserJoinCommand } from '../../application/command/user.join/user.join.command';
import { generateString } from '@nestjs/typeorm';
import { pubSub } from '../../../app.module';
import { SendAttemptDto } from '../dto/send.attempt.dto';
import { SendMessageCommand } from 'src/user/application/command/send.message/send.message.command';
import { SkipThrottle } from '@nestjs/throttler';
import { SendPositionDto } from './dto/send.position.dto';
import { PositionService } from 'src/position/position.service';
import { UserGuard } from 'lib/authorization/src/user.guard';
import {
  GqlUserGuard,
  GqlWsUserGuard,
} from 'lib/authorization/src/gql.user.guard';
import { UseGuards } from '@nestjs/common';
import { SendAttemptCommand } from 'src/user/application/command/send.attempt/send.attempt.command';

@Resolver(() => UserUser)
@GqlUserGuard()
export class UserUserResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
    private positionService: PositionService,
  ) {}

  @Query(() => UserUser)
  async me(@GqlUserId() userId: string, @Context() ctx) {
    return await this.provider.userRepository.findOne({
      where: { id: userId },
    });
  }

  @Mutation(() => String)
  async leave(@GqlUserId() userId: string) {
    await this.commandBus.execute(
      new UserLeaveCommand({
        id: userId,
      }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  async send_position(
    @GqlUserId() userId: string,
    @Args('dto') dto: SendPositionDto,
  ) {
    await this.positionService.save(userId, dto);
    return 'ok';
  }

  @Mutation(() => String)
  async join(@GqlUserId() userId: string) {
    await this.commandBus.execute(
      new UserJoinCommand({
        id: userId,
        teamId: generateString(),
      }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  @SkipThrottle()
  async sendAttempt(
    @GqlUserId() userId: string,
    @Args('dto') dto: SendAttemptDto,
  ) {
    await this.commandBus.execute(
      new SendAttemptCommand({
        userId,
        taskInstanceId: dto.taskInstanceId,
        answer: dto.answer,
      }),
    );
    return 'ok';
  }

  @Mutation(() => String)
  async SendMessage(
    @GqlUserId() userId: string,
    @Args('message') message: string,
  ) {
    const id = generateString();
    await this.commandBus.execute(
      new SendMessageCommand({ id, text: message, userId }),
    );
    return id;
  }

  @ResolveField(() => UserTeam)
  async team(@Parent() user: UserUser) {
    if (!user.teamId) {
      return null;
    }
    return await this.provider.teamRepository.findOne({
      where: { id: user.teamId },
    });
  }
}
