import { AggregateRoot } from '@nestjs/cqrs';
import { GameInstanceActivatedEvent } from './event/game-instance.activated.event';
import { GameInstanceApprovedEvent } from './event/game-instance.approved.event';

export type GameInstanceRequiredOptions = {
  id: string;
  gameId: string;
  teamId: string;
};

export type GameInstanceOptionalOptions = {
  status: string;
};

export type GameInstanceOptions = Required<GameInstanceRequiredOptions> &
  Partial<GameInstanceOptionalOptions>;

export interface GameInstance {
  approve: () => void;
  commit: () => void;
}

export class GameInstanceDomain extends AggregateRoot implements GameInstance {
  id: string;
  gameId: string;
  teamId: string;
  status: string;

  approve() {
    this.status = 'APPROVED';
    this.apply(
      new GameInstanceApprovedEvent({
        id: this.id,
        teamId: this.teamId,
        gameId: this.gameId,
      }),
    );
  }

  activate() {
    this.status = 'ACTIVATED';
    this.apply(
      new GameInstanceActivatedEvent({
        id: this.id,
        teamId: this.teamId,
        gameId: this.gameId,
      }),
    );
  }
}
