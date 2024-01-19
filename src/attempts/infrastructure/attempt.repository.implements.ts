import { AttemptEntity } from './attempt.entity';
import { Attempt } from '../domain/attempt.domain';
import { AttemptRepository } from '../domain/attempt.repository';
import { AttemptFactory } from '../domain/attempt.factory';
import { writeConnection } from 'lib/db.module';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AttemptRepositoryImplements implements AttemptRepository {
  constructor(private factory: AttemptFactory) {}

  async save(attempt: Attempt) {
    const entity = this.modelToEntity(attempt);
    await this.repository.save(entity);
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return this.entityToModel(entity);
  }

  private entityToModel(data: AttemptEntity): Attempt {
    return this.factory.reconstitute(data);
  }

  private modelToEntity(data: any): AttemptEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(AttemptEntity);
  }
}
