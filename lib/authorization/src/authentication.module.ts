import { DynamicModule, Module } from '@nestjs/common';
import { AuthorizationOnlyModule } from './authorization-only.module';
import { AuthService } from './api/auth.service';

@Module({})
export class AuthenticationModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthenticationModule,
      imports: [AuthorizationOnlyModule],
      providers: [AuthService],
      exports: [AuthService],
    };
  }
}
