import { AggregateRoot } from '@nestjs/cqrs';

export class BaseDomain extends AggregateRoot {
  createdAt: Date;
  updatedAt: Date;
}
