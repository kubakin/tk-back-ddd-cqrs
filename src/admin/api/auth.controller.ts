import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthService } from '../../../lib/authorization/src/api/auth.service';
// import { Request, Response } from 'express';
import { AdminLoginDto } from './dto/admin.login.dto';

@Controller('admin')
export class AuthContoller {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: any,
    @Req() request: any,
    @Body() dto: AdminLoginDto,
  ) {
    return await this.authService.login(
      dto.phone,
      dto.password,
      request,
      response,
    );
  }
}
