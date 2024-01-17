import {
  Args,
  Context,
  GqlExecutionContext,
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

@Resolver(() => UserUser)
@UseGuards(GqlWsUserGuard)
export class UserUserSubResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
    private positionService: PositionService,
  ) {}

  @Subscription(() => UserUser, {
    filter: (payload, vars, context) => {
      return payload?.userUpdated?.id === context?.req?.extra?.user?.id;
    },
  })
  @SkipThrottle()
  userUpdated() {
    return pubSub.asyncIterator('userUpdated');
  }
}
