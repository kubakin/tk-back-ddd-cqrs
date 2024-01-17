import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GqlWsUserGuard } from './gql.user.guard';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  providers: [JwtStrategy, GqlWsUserGuard],
  exports: [JwtModule, GqlWsUserGuard],
})
export class AuthorizationOnlyModule {}
