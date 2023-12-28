import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TeamRepository } from '../../../domain/team.repository';
import { TeamChangeSessionCommand } from './team.change.session.command';

@CommandHandler(TeamChangeSessionCommand)
export class TeamChangeSessionHandler
  implements ICommandHandler<TeamChangeSessionCommand, void>
{
  @Inject(InjectionToken.TeamRepository)
  private readonly teamRepository: TeamRepository;

  async execute(command: TeamChangeSessionCommand): Promise<void> {
    const team = await this.teamRepository.findByCreatorId(command.userId);
    team.changeCurrentSession(command.gameInstanceId);
    await this.teamRepository.save(team);
    team.commit();
  }
}
