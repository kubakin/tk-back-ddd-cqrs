import { User, UserDomain, UserOptions } from './user.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateUserOptions {
  id: string;
  phone: string;
}

@Injectable()
export class UserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateUserOptions): User {
    return this.reconstitute({ id: options.id, phone: options.phone });
  }

  reconstitute(options: UserOptions): User {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new UserDomain(), options),
    );
  }
}
