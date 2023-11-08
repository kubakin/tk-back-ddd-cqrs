import { AggregateRoot } from '@nestjs/cqrs';
import { GameTaskDistributeRequestedEvent } from './event/game-task.distribute.requested.event';

export type GameRequiredOptions = {
  id: string;
  name: string;
  disabled: boolean;
  cost: number;
};

export type GameOptionalOptions = {
  description: string;
};

export type GameOptions = Required<GameRequiredOptions> &
  Partial<GameOptionalOptions>;

export interface GameParams {
  taskStrategy: string;
  id: string;
}

export interface Game extends GameParams {
  isFree: boolean;
  delete: () => void;
  distribute: (teamId: string) => void;
  commit: () => void;
}

export class GameDomain extends AggregateRoot implements Game {
  id: string;
  name: string;
  disabled: boolean;
  deleted: boolean;
  taskStrategy: string;
  cost: number;

  distribute(teamId: string) {
    this.apply(
      new GameTaskDistributeRequestedEvent({ gameId: this.id, teamId }),
    );
  }

  get isFree() {
    return this.cost === 0;
  }

  delete() {
    this.deleted = true;
  }
}
