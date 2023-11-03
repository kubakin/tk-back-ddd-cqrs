import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles/roles.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';

export function AdminGuard(): MethodDecorator & ClassDecorator {
  const a = UseGuards(JwtAuthGuard, RolesGuard);
  const b = Roles(Role.Admin);
  return (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    if (process.env.DISABLE_GUARD === 'true') {
      return;
    }
    a(target, propertyKey, descriptor);
    b(target, propertyKey, descriptor);
  };
}
