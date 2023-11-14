import { Inject, Injectable } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import {
  AuthData,
  AuthDataProvider,
} from '../../../../lib/authorization/src/api/auth-data-provider';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class UserAuthDataProvider implements AuthDataProvider {
  constructor(
    @Inject(InjectionToken.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async provideByPhone(phone: string): Promise<AuthData | null> {
    const user = await this.userRepository.provideByPhone(phone);
    return user;
  }

  async provideTokenDataById(id: string): Promise<any> {
    const user = await this.userRepository.provideById(id);
    return user;
  }
}
