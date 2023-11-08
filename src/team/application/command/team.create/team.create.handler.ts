import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamCreateCommand } from './team.create.command';
import { TeamFactory } from '../../../domain/team.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { TeamRepository } from '../../../domain/team.repository';

@CommandHandler(TeamCreateCommand)
export class TeamCreateHandler
  implements ICommandHandler<TeamCreateCommand, void>
{
  @Inject(InjectionToken.TeamRepository)
  private readonly teamRepository: TeamRepository;

  constructor(private teamFactory: TeamFactory) {}

  async execute(command: TeamCreateCommand): Promise<void> {
    const team = this.teamFactory.create({
      id: command.id,
      name: command.name,
      userId: command.userId,
    });
    team.created();
    await this.teamRepository.save(team);
    team.commit();
  }
}
