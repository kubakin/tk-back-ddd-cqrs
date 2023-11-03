import { AggregateRoot } from '@nestjs/cqrs';
import { GameInstancePaidEvent } from './event/game-instance.paid.event';

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
  paid: () => void;
  commit: () => void;
}

export class GameInstanceDomain extends AggregateRoot implements GameInstance {
  id: string;
  gameId: string;
  teamId: string;
  status: string;

  paid() {
    this.status = 'PAID';
    this.apply(
      new GameInstancePaidEvent({
        id: this.id,
        teamId: this.teamId,
        gameId: this.gameId,
      }),
    );
  }
}
