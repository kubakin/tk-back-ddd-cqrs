import { GameTaskDistributeRequestedEvent } from './event/game-task.distribute.requested.event';
import { BaseDomain } from '../../common/base/base.domain';

export type GameRequiredOptions = {
  id: string;
  name: string;
  taskStrategy: string;
  duration: number;
};

export type GameOptionalOptions = {
  description: string;
  hidden: boolean;
  rulesImgUrl: string;
  logoUrl: string;
  personLimit: number;
  cost: number;
};

export type GameOptions = Required<GameRequiredOptions> &
  Partial<GameOptionalOptions>;

export interface GameParams {
  taskStrategy: string;
  id: string;
}

export interface Game extends GameParams {
  isFree: boolean;
  distribute: (teamId: string) => void;
  commit: () => void;
  update: (data: Partial<GameDomain>) => void;
}

export class GameDomain extends BaseDomain implements Game {
  id: string;
  name: string;
  hidden: boolean;
  taskStrategy: string;
  cost: number;
  rulesImgUrl: string;
  logoUrl: string;
  personLimit: number;
  duration: number;
  description: string;

  distribute(teamId: string) {
    this.apply(
      new GameTaskDistributeRequestedEvent({ gameId: this.id, teamId }),
    );
  }

  get isFree() {
    return this.cost === 0;
  }

  update(data: Partial<GameDomain>) {
    Object.assign(this, data);
  }
}
