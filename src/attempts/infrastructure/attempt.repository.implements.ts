import { AttemptEntity } from './attempt.entity';
import { Attempt } from '../domain/attempt.domain';
import { AttemptRepository } from '../domain/attempt.repository';
import { AttemptFactory } from '../domain/attempt.factory';

const repository: AttemptEntity[] = [];

export class AttemptRepositoryImplements implements AttemptRepository {
  constructor(private factory: AttemptFactory) {}

  async save(team: Attempt) {
    repository.push(this.modelToEntity(team));
    console.log(repository);
  }

  async findById(id: string) {
    return this.entityToModel(repository.find((item) => item.id === id));
  }

  private entityToModel(data: AttemptEntity): Attempt {
    return this.factory.reconstitute(data);
  }

  private modelToEntity(data: any): AttemptEntity {
    return { ...data };
  }
}
