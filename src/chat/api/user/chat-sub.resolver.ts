import { Context, Resolver, Subscription } from '@nestjs/graphql';
import { RepoProvider } from '../../../common/repo.provider';
import { pubSub } from '../../../app.module';
import { SkipThrottle } from '@nestjs/throttler';
import {
  GqlUserGuard,
  GqlWsUserGuard,
} from 'lib/authorization/src/gql.user.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { UserChat } from './chat.schema';

@Resolver(() => UserChat)
@UseGuards(GqlWsUserGuard)
export class UserChatSubResolver {
  constructor(private provider: RepoProvider) {}

  @Subscription(() => UserChat)
  @SkipThrottle()
  async newMessage(@Context() context) {
    const userId = context?.req?.extra?.user?.id;
    const user = await this.provider.userRepository.findOne({
      where: { id: userId },
    });
    if (!user.teamId) {
      throw new BadRequestException('Not allower without team');
    }
    return pubSub.asyncIterator(`chat_${user.teamId}`);
  }
}
