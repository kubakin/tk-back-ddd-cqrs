import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlUserId = createParamDecorator((data: unknown, ctx: any) => {
  const context: any = GqlExecutionContext.create(ctx);
  const request = context.getContext();
  return request?.req?.user?.userId;
});
