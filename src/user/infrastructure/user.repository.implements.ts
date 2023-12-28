import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.domain';
import { UserFactory } from '../domain/user.factory';
import { UserEntity } from './user.entity';
import { writeConnection } from '../../../lib/db.module';
import { UserDummyRepositoryInterface } from '../dummy/user.dummy.repository.interface';
import { Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuthData } from '../../../lib/authorization/src/api/auth-data-provider';
import { EventBus } from '@nestjs/cqrs';
import { UserUpdatedEvent } from './event/user.updated.event';

@Injectable()
export class UserRepositoryImplements
  implements UserRepository, UserDummyRepositoryInterface
{
  constructor(
    private userFactory: UserFactory,
    private eventBus: EventBus,
  ) {}

  async save(user: User) {
    const models = [user];
    const entities = models.map((model) => this.modelToEntity(model));
    const result = await this.repository.save(entities, { reload: true });
    result.map(async (it) => {
      await this.eventBus.publish(new UserUpdatedEvent(it));
    });
  }

  async delete(user: User) {
    const models = [user];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.remove(entities);
  }

  async provideById(id: string): Promise<AuthData> {
    const entity = await this.repository.findOneBy({ id });
    return {
      id: entity.id,
      isAdmin: false,
      phone: entity.phone,
    };
  }

  async provideByPhone(phone: string): Promise<AuthData> {
    const entity = await this.repository.findOneBy({ phone });
    return {
      id: entity.id,
      isAdmin: false,
      phone: entity.phone,
    };
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    return this.entityToModel(entity);
  }

  async findAll() {
    const entities = await this.repository.find();
    return entities.map((it) => this.entityToModel(it));
  }

  async findDummyUsersIds() {
    const entities = await this.repository.find({
      where: { name: Like(`%dummy%`) },
    });
    return entities.map((it) => it.id);
  }

  private entityToModel(data: UserEntity): User {
    return this.userFactory.reconstitute(data);
  }

  private modelToEntity(data: any): UserEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(UserEntity);
  }
}
