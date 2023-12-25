import { writeConnection } from '../../../lib/db.module';
import { Injectable } from '@nestjs/common';
import { AuthData } from '../../../lib/authorization/src/api/auth-data-provider';
import { Admin } from '../domain/admin.domain';
import { AdminFactory } from '../domain/admin.factory';
import { AdminRepository } from '../domain/admin.repository';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminRepositoryImplements implements AdminRepository {
  constructor(private factory: AdminFactory) {}

  async onApplicationBootstrap() {
    const admin = new AdminEntity();
    admin.id = 'f4551614-fe18-4ec3-9961-beceb210ccbe';
    admin.updatedAt = new Date();
    admin.createdAt = new Date();
    admin.phone = '123';
    admin.password = '123';
    await this.repository.save(admin);
  }

  async save(user: Admin) {
    const models = [user];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  async provideById(id: string): Promise<AuthData> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) return null;
    return {
      id: entity.id,
      isAdmin: false,
      phone: entity.phone,
    };
  }

  async provideByPhone(phone: string): Promise<AuthData> {
    const entity = await this.repository.findOneBy({ phone });
    if (!entity) return null;
    return {
      id: entity.id,
      isAdmin: false,
      phone: entity.phone,
      password: entity.password,
    };
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    return this.entityToModel(entity);
  }

  private entityToModel(data: AdminEntity): Admin {
    return this.factory.reconstitute(data);
  }

  private modelToEntity(data: any): AdminEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(AdminEntity);
  }
}
