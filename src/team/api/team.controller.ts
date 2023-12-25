import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MyDecorator, TeamCreateDto } from './dto/team.create.dto';
import { TeamCreateCommand } from '../application/command/team.create/team.create.command';
import { generateString } from '@nestjs/typeorm';
import { UserId } from '../../../lib/authorization/src/jwt/user-id.decorator';
import { UserGuard } from '../../../lib/authorization/src/user.guard';
import { TeamStartGameCommand } from '../application/command/team.start.game/team.start.game.command';

@Controller('team')
@UserGuard()
export class TeamController {
  constructor(private commandBus: CommandBus) {}

  @Post('')
  async create(@UserId() userId: string, @Body() dto: TeamCreateDto) {
    const id = generateString();
    try {
      const value1 = Reflect.getMetadata(TeamCreateDto.prototype, MyDecorator);
      console.log(value1);
    } catch (e) {
      console.log(e);
    }
    await this.commandBus.execute(
      new TeamCreateCommand({
        id,
        name: dto.name,
        userId,
      }),
    );
    return id;
  }

  @Post(':teamId/start/:gameId')
  async startGame(
    @UserId() userId: string,
    @Param('gameId') gameId: string,
    @Param('teamId') teamId: string,
  ) {
    await this.commandBus.execute(
      new TeamStartGameCommand({
        id: teamId,
        gameId: gameId,
        userId,
      }),
    );
  }
}
