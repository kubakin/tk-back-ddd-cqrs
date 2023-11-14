import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterCommand } from '../application/command/user.register/user.register.command';
import { generateString } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { AuthService } from '../../../lib/authorization/src/api/auth.service';
import { Request, Response } from 'express';
import { UserLoginDto } from './dto/user.login.dto';
import { UserId } from '../../../lib/authorization/src/jwt/user-id.decorator';
import { UserJoinCommand } from '../application/command/user.join/user.join.command';
import { UserGuard } from '../../../lib/authorization/src/user.guard';
import { UserLeaveCommand } from '../application/command/user.leave/user.leave.command';

@Controller('user')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Body() dto: UserCreateDto,
  ) {
    await this.commandBus.execute(
      new UserRegisterCommand({
        id: generateString(),
        name: dto.name,
        phone: dto.phone,
      }),
    );
    await this.authService.login(dto.phone, null, request, response);
    return 'ok';
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Body() dto: UserLoginDto,
  ) {
    return await this.authService.login(dto.phone, null, request, response);
  }

  @Post('join/:teamId')
  @UserGuard()
  async join(@UserId() userId: string, @Param('teamId') teamId: string) {
    await this.commandBus.execute(
      new UserJoinCommand({
        id: userId,
        teamId,
      }),
    );
  }

  @Post('leave')
  @UserGuard()
  async leave(@UserId() userId: string) {
    await this.commandBus.execute(
      new UserLeaveCommand({
        id: userId,
      }),
    );
  }
}
