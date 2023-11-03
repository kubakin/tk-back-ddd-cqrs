import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationException } from './exceptions';

@Catch(AuthorizationException)
export class AuthorizationExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(401).json({
      message: exception.message,
    });
  }
}
