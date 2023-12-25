import { Inject, Injectable } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import {
  AuthData,
  AuthDataProvider,
} from '../../../../lib/authorization/src/api/auth-data-provider';
import { AdminRepository } from 'src/admin/domain/admin.repository';

@Injectable()
export class AdminAuthDataProvider implements AuthDataProvider {
  constructor(
    @Inject(InjectionToken.AdminRepository)
    private readonly repository: AdminRepository,
  ) {}

  async provideByPhone(phone: string): Promise<AuthData | null> {
    const user = await this.repository.provideByPhone(phone);
    return user;
  }

  async provideTokenDataById(id: string): Promise<any> {
    const user = await this.repository.provideById(id);
    return user;
  }
}
