import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

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
    return super.canActivate(new ExecutionContextHost([req])); // NOTE
  }
}
