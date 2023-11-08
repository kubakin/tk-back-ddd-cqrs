import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamFactory } from '../../../domain/team.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TeamRepository } from '../../../domain/team.repository';
import { TeamDeleteCommand } from './team.delete.command';

@CommandHandler(TeamDeleteCommand)
export class TeamDeleteHandler
  implements ICommandHandler<TeamDeleteCommand, void>
{
  @Inject(InjectionToken.TeamRepository)
  private readonly teamRepository: TeamRepository;

  constructor(private teamFactory: TeamFactory) {}

  async execute(command: TeamDeleteCommand): Promise<void> {
    const team = await this.teamRepository.findById(command.id);
    team.deleted();
    await this.teamRepository.delete(team);
    team.commit();
  }
}
