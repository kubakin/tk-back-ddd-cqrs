import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const context = GqlExecutionContext.create(ctx);
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return false;
    }
    const {
      req: { user },
    } = context.getContext();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
