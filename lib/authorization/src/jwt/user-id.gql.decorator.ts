import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const request = context.getContext();
    return request?.req?.user?.userId;
  },
);
