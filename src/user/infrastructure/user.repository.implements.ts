import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.domain';
import { UserFactory } from '../domain/user.factory';
import { UserEntity } from './user.entity';
import { writeConnection } from '../../../lib/db.module';
import { UserDummyRepositoryInterface } from '../dummy/user.dummy.repository.interface';
import { Like } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImplements
  implements UserRepository, UserDummyRepositoryInterface
{
  constructor(private userFactory: UserFactory) {}

  async save(user: User) {
    const models = [user];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  async delete(user: User) {
    const models = [user];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.remove(entities);
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
