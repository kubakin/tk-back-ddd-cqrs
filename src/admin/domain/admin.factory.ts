import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Admin, AdminDomain, AdminOptions } from './admin.domain';

interface CreateAdminOptions {
  id: string;
  phone: string;
  password: string;
}

@Injectable()
export class AdminFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateAdminOptions): Admin {
    return this.reconstitute({
      id: options.id,
      phone: options.phone,
      password: options.password,
      createdAt: new Date(),
    });
  }

  reconstitute(options: AdminOptions): Admin {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new AdminDomain(), { ...options, updatedAt: new Date() }),
    );
  }
}
