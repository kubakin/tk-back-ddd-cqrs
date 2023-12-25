import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TeamRepository } from '../../../domain/team.repository';
import { TeamStartGameCommand } from './team.start.game.command';

@CommandHandler(TeamStartGameCommand)
export class TeamStartGameHandler
  implements ICommandHandler<TeamStartGameCommand, void>
{
  @Inject(InjectionToken.TeamRepository)
  private readonly teamRepository: TeamRepository;

  async execute(command: TeamStartGameCommand): Promise<void> {
    const team = await this.teamRepository.findById(command.id);
    team.joinGame(command.gameId);
    // await this.teamRepository.save(team);
    team.commit();
  }
}
