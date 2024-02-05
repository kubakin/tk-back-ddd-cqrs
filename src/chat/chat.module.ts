import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { MessageFactory } from './domain/message.factory';
import { MessageCreateRequested } from './application/event/message.create.requested';
import { InjectionToken } from './application/injection.token';
import { MessageRepositoryImplements } from './infrastructure/message.repository.implements';
import { RepoProvider } from 'src/common/repo.provider';
import { UserChatResolver } from './api/user/chat.resolver';
import { UserChatSubResolver } from './api/user/chat-sub.resolver';
import { MessageCreatedHandler } from './api/handlers/chat.updated.handler';

const application = [MessageCreateRequested, MessageCreatedHandler];

const dummy = [];

const resolvers = [UserChatResolver, UserChatSubResolver];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.MessageRepository,
    useClass: MessageRepositoryImplements,
  },
  RepoProvider,
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, MessageFactory, ...infrastructure, ...resolvers],
  controllers: [],
})
export class ChatModule {
  constructor() {}
}
