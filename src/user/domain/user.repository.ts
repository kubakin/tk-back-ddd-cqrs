import { User } from './user.domain';

export class UserRepository {
  save: (user: User) => Promise<void>;
  findById: (id: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
}
