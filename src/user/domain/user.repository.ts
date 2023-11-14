import { User } from './user.domain';
import { AuthData } from '../../../lib/authorization/src/api/auth-data-provider';

export class UserRepository {
  save: (user: User) => Promise<void>;
  delete: (user: User) => Promise<void>;
  findById: (id: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  provideByPhone: (phone: string) => Promise<AuthData>;
  provideById: (id: string) => Promise<AuthData>;
}
