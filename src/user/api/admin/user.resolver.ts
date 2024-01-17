import {
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AdminUser } from './user.schema';
import { RepoProvider } from '../../../common/repo.provider';
import { UserTeam } from '../../../team/api/user/team.schema';
import { GqlUserId } from '../../../../lib/authorization/src/jwt/user-id.gql.decorator';
import { CommandBus } from '@nestjs/cqrs';
import { UserLeaveCommand } from '../../application/command/user.leave/user.leave.command';
import { UserJoinCommand } from '../../application/command/user.join/user.join.command';
import { generateString } from '@nestjs/typeorm';
import { pubSub } from '../../../app.module';
import { AdminTeam } from 'src/team/api/admin/team.schema';
import { PositionSchema } from 'src/position/position.schema';
import { PositionService } from 'src/position/position.service';

@Resolver(() => AdminUser)
export class AdminUserResolver {
  constructor(
    private provider: RepoProvider,
    private commandBus: CommandBus,
    private positionService: PositionService,
  ) {}

  @Query(() => [AdminUser])
  async admin_user_list() {
    return await this.provider.userRepository.find();
  }

  @ResolveField(() => AdminTeam)
  async team(@Parent() user: AdminUser) {
    if (!user.teamId) {
      return null;
    }
    return await this.provider.teamRepository.findOne({
      where: { id: user.teamId },
    });
  }

  @ResolveField(() => PositionSchema)
  async position(@Parent() user: AdminUser) {
    return await this.positionService.get(user.id);
  }
}
