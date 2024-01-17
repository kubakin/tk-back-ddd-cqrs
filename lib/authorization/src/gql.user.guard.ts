import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';
import { GqlRolesGuard } from './roles/gql.roles.guard';
import { GqlJwtAuthGuard } from './jwt/gql.jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

export function GqlUserGuard(): MethodDecorator & ClassDecorator {
  const a = UseGuards(GqlJwtAuthGuard, GqlRolesGuard);
  const b = Roles(Role.User, Role.Admin);
  return (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    a(target, propertyKey, descriptor);
    b(target, propertyKey, descriptor);
  };
}

@Injectable()
export class GqlWsUserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx);
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      process.env.JWT_SECRET,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }
    const { req } = context.getContext();
   
    const rs = this.decodeUser(req?.connectionParams?.headers)

    return !!rs;
  }

  decodeUser(headers: unknown) {
    const authorization: string = headers?.['Authorization'];
    if (!authorization) {
      return false;
    }
    const token = authorization.replace('Bearer ', '');
    const rs = this.jwtService.decode(token);
    return rs
  }
}
