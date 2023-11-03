import { AggregateRoot } from '@nestjs/cqrs';
import { TeamJoinRequestedEvent } from './event/team.join.requested.event';
import { generateString } from '@nestjs/typeorm';

export type TeamRequiredOptions = {
  id: string;
  name: string;
  createdAt: Date;
  createdBy: string;
};

export type TeamOptionalOptions = {
  currentGameId: string;
};

export type TeamOptions = Required<TeamRequiredOptions> &
  Partial<TeamOptionalOptions>;

export interface Team {
  joinGame: (gameId: string) => void;
}

export class TeamDomain extends AggregateRoot implements Team {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  currentGameId?: string;

  joinGame(gameId: string) {
    this.apply(
      new TeamJoinRequestedEvent({
        id: generateString(),
        teamId: this.id,
        gameId,
      }),
    );
  }
}
