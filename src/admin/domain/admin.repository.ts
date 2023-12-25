import { AuthData } from '../../../lib/authorization/src/api/auth-data-provider';
import { Admin } from './admin.domain';

export class AdminRepository {
  save: (user: Admin) => Promise<void>;
  findById: (id: string) => Promise<Admin | null>;
  provideByPhone: (phone: string) => Promise<AuthData>;
  provideById: (id: string) => Promise<AuthData>;
}
