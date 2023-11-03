import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.domain';
import { UserFactory } from '../domain/user.factory';
import { UserEntity } from './user.entity';

const repository: UserEntity[] = [
  { id: '1', phone: '+123' },
  { id: '2', phone: '+223' },
  { id: '3', phone: '+323' },
  { id: '4', phone: '+423' },
  { id: '5', phone: '+523' },
];

export class UserRepositoryImplements implements UserRepository {
  constructor(private userFactory: UserFactory) {}

  async save(user: User) {
    repository.push(this.modelToEntity(user));
    console.log(repository);
  }

  async findById(id: string) {
    return this.entityToModel(repository.find((item) => item.id === id));
  }

  async findAll() {
    console.log('helol');
    return repository.map((item) => this.entityToModel(item));
  }

  private entityToModel(data: UserEntity): User {
    return data as any;
    return this.userFactory.reconstitute(data);
  }

  private modelToEntity(data: any): UserEntity {
    return { ...data };
  }
}
