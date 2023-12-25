import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GqlUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // const request = ctx.switchToHttp().getRequest();
    // return request.user.userId;
    return 'ddc850ac-f4d9-456d-bfc5-644931f5a16a';
  },
);
