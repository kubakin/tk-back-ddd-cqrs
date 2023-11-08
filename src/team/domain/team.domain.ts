import { AggregateRoot } from '@nestjs/cqrs';
import { TeamJoinRequestedEvent } from './event/team.join.requested.event';
import { generateString } from '@nestjs/typeorm';
import { HasId } from '../../common/interfaces/has-id.interface';
import { SendAttemptRequestedEvent } from './event/send.attempt.requested.event';
import { Logger } from '@nestjs/common';

export type TeamRequiredOptions = {
  id: string;
  name: string;
  createdBy: string;
};

export type TeamOptionalOptions = {
  currentGameId: string;
};

export type TeamOptions = Required<TeamRequiredOptions> &
  Partial<TeamOptionalOptions>;

export interface Team extends HasId {
  joinGame: (gameId: string) => void;
  created: () => void;
  deleted: () => void;
  commit: () => void;
}

export class TeamDomain extends AggregateRoot implements Team {
  id: string;
  name: string;
  createdBy: string;
  currentGameId?: string;

  created() {
    this.logger.debug('Created');
  }

  deleted() {
    this.logger.debug('Deleted');
  }

  sendAttempt(taskInstanceId: string, answer: string, userId: string) {
    this.apply(
      new SendAttemptRequestedEvent({
        teamId: this.id,
        userId,
        answer: answer,
        currentGameId: this.currentGameId,
        taskInstanceId,
      }),
    );
  }

  joinGame(gameId: string) {
    this.apply(
      new TeamJoinRequestedEvent({
        id: generateString(),
        teamId: this.id,
        gameId,
      }),
    );
  }

  get logger() {
    return new Logger(`Team ${this.name}`);
  }
}
