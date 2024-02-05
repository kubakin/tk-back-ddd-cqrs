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
import { RepoProvider } from '../../../common/repo.provider';
import { UserTeam } from '../../../team/api/user/team.schema';
import { GqlUserId } from '../../../../lib/authorization/src/jwt/user-id.gql.decorator';
import { CommandBus } from '@nestjs/cqrs';
import { generateString } from '@nestjs/typeorm';
import { pubSub } from '../../../app.module';
import { SendMessageCommand } from 'src/user/application/command/send.message/send.message.command';
import { SkipThrottle } from '@nestjs/throttler';
import { PositionService } from 'src/position/position.service';
import { UserGuard } from 'lib/authorization/src/user.guard';
import {
  GqlUserGuard,
  GqlWsUserGuard,
} from 'lib/authorization/src/gql.user.guard';
import { UseGuards } from '@nestjs/common';
import { SendAttemptCommand } from 'src/user/application/command/send.attempt/send.attempt.command';
import { UserChat } from './chat.schema';

@Resolver(() => UserChat)
@GqlUserGuard()
export class UserChatResolver {
  constructor(private provider: RepoProvider) {}

  @Query(() => [UserChat])
  async chat(@GqlUserId() userId: string, @Context() ctx) {
    const user = await this.provider.userRepository.findOne({
      where: { id: userId },
    });

    return await this.provider.messageRepository.find({
      where: { teamId: user.teamId },
    });
  }
}
