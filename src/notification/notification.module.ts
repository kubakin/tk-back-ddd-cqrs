import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserNotificationResolver } from './api/user/notification.resolver';
import { AttemptFailedNotify } from './api/handlers/attempt.failed.notification';
import { RepoProvider } from 'src/common/repo.provider';

const application = [AttemptFailedNotify];

const resolvers = [UserNotificationResolver];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...resolvers, RepoProvider],
})
export class NotificationModule {}
