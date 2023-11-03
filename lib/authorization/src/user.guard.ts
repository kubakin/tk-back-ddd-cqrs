import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';

export function UserGuard(): MethodDecorator & ClassDecorator {
  const a = UseGuards(JwtAuthGuard, RolesGuard);
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
