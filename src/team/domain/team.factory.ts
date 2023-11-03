import { Team, TeamDomain, TeamOptions } from './team.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateTeamOptions {
  id: string;
  name: string;
  userId: string;
}

@Injectable()
export class TeamFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTeamOptions): Team {
    return this.reconstitute({
      id: options.id,
      createdBy: options.userId,
      name: options.name,
      createdAt: new Date(),
    });
  }

  reconstitute(options: TeamOptions): Team {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new TeamDomain(), options),
    );
  }
}
