import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { TeamCreateDto } from './dto/team.create.dto';
import { TeamCreateCommand } from '../application/command/team.create/team.create.command';
import { generateString } from '@nestjs/typeorm';
import { UserId } from '../../../lib/authorization/src/jwt/user-id.decorator';
import { UserGuard } from '../../../lib/authorization/src/user.guard';

@Controller('team')
@UserGuard()
export class TeamController {
  constructor(private commandBus: CommandBus) {}

  @Post('')
  async create(@UserId() userId: string, @Body() dto: TeamCreateDto) {
    const id = generateString();
    await this.commandBus.execute(
      new TeamCreateCommand({
        id,
        name: dto.name,
        userId,
      }),
    );
    return id;
  }
}
