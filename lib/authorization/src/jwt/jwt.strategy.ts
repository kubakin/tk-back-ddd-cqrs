import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Role } from '../roles/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string; isAdmin: boolean }) {
    if (!payload.isAdmin) {
      return { userId: payload.id, roles: [Role.User] };
    }

    if (payload.isAdmin) {
      return { adminId: payload.id, roles: [Role.Admin] };
    }

    throw Error('Bad JWT Token');
  }
}
