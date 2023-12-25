import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Message, MessageDomain, MessageOptions } from './message.domain';

interface CreateMessageFactory {
  id: string;
  text: string;
  teamId: string;
  userId?: string;
  adminId?: string;
}

@Injectable()
export class MessageFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateMessageFactory): Message {
    return this.reconstitute({
      id: options.id,
      userId: options.userId,
      adminId: options.adminId,
      createdAt: new Date(),
      teamId: options.teamId,
      text: options.text,
    });
  }

  reconstitute(options: MessageOptions): Message {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new MessageDomain(), { ...options, updatedAt: new Date() }),
    );
  }
}
