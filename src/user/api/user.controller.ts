import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserRegisterCommand } from "../application/command/user.register/user.register.command";
import { generateString } from "@nestjs/typeorm";
import { UserCreateDto } from "./dto/user.create.dto";
import { AuthService } from "../../../lib/authorization/src/api/auth.service";
// import { Request, Response } from 'express';
import { UserLoginDto } from "./dto/user.login.dto";
import { UserId } from "../../../lib/authorization/src/jwt/user-id.decorator";
import { UserJoinCommand } from "../application/command/user.join/user.join.command";
import { UserGuard } from "../../../lib/authorization/src/user.guard";
import { UserLeaveCommand } from "../application/command/user.leave/user.leave.command";
import { SendMessageDto } from "./dto/send.message.dto";
import { SendMessageCommand } from "../application/command/send.message/send.message.command";
import { MeQuery } from "../application/query/me/me.query";
import { Context, Subscription } from "@nestjs/graphql";
import { UserUser } from "./user/user.schema";

@Controller("user")
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private authService: AuthService,
    private queryBus: QueryBus
  ) {
  }

  @Get()
  async me() {
    return await this.queryBus.execute(
      new MeQuery({ userId: "b5dfa866-11e8-4ac9-b2c8-4b9585ccf67f" })
    );
  }

  @Post("register")
  async register(
    @Res({ passthrough: true }) response: any,
    @Req() request: any,
    @Body() dto: UserCreateDto
  ) {
    await this.commandBus.execute(
      new UserRegisterCommand({
        id: generateString(),
        name: dto.name,
        phone: dto.phone
      })
    );
    await this.authService.login(dto.phone, null, request, response);
    return "ok";
  }

  @Post("login")
  async login(
    @Res({ passthrough: true }) response: any,
    @Req() request: any,
    @Body() dto: UserLoginDto
  ) {
    return await this.authService.login(dto.phone, null, request, response);
  }

  @Post("join/:teamId")
  @UserGuard()
  async join(@UserId() userId: string, @Param("teamId") teamId: string) {
    await this.commandBus.execute(
      new UserJoinCommand({
        id: userId,
        teamId
      })
    );
  }

  @Post("leave")
  @UserGuard()
  async leave(@UserId() userId: string) {
    await this.commandBus.execute(
      new UserLeaveCommand({
        id: userId
      })
    );
  }

  @Post("send-attempt/:taskInstanceId")
  @UserGuard()
  async sendAttempt(
    @UserId() userId: string,
    @Param("taskInstanceId") id: string
  ) {
  }

  @Post("send-message")
  @UserGuard()
  async sendMessage(@UserId() userId: string, @Body() dto: SendMessageDto) {
    await this.commandBus.execute(
      new SendMessageCommand({ id: generateString(), text: dto.text, userId })
    );
  }

  @Subscription(() => UserUser)
  async userUpdated(@Context() context) {
    return context.pubSub.asyncIterator("userUpdated");
  }
}
