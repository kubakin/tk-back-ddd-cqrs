import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { MessageFactory } from './domain/message.factory';
import { MessageCreateRequested } from './application/event/message.create.requested';
import { InjectionToken } from './application/injection.token';
import { MessageRepositoryImplements } from './infrastructure/message.repository.implements';

const application = [MessageCreateRequested];

const dummy = [];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.MessageRepository,
    useClass: MessageRepositoryImplements,
  },
];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule],
  providers: [...application, MessageFactory, ...infrastructure],
  controllers: [],
})
export class ChatModule {
  constructor() {}
}
