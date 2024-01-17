import { GameTaskDistributeRequestedEvent } from './event/game-task.distribute.requested.event';
import { BaseDomain } from '../../common/base/base.domain';
import { Logger } from '@nestjs/common';

export type GameRequiredOptions = {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
  cost: number;
  rules: string;
  personLimit: number;
  duration: number;
  taskStrategy: string;
  autoStart: boolean;
  autoEnd: boolean;
  plannedAt: Date;
};

export type GameOptionalOptions = {};

export type GameOptions = Required<GameRequiredOptions> &
  Partial<GameOptionalOptions>;

export interface GameParams {
  taskStrategy: string;
  id: string;
}

export interface Game extends GameParams {
  isFree: boolean;
  startImmediate: boolean;
  distribute: (instanceId: string, teamId: string) => void;
  commit: () => void;
  update: (data: Partial<GameDomain>) => void;
}

export class GameDomain extends BaseDomain implements Game {
  id: string;
  name: string;
  autoStart: boolean;
  autoEnd: boolean;
  hidden: boolean;
  taskStrategy: string;
  cost: number;
  rules: string;
  logoUrl: string;
  personLimit: number;
  duration: number;
  description: string;

  distribute(instanceId: string, teamId: string) {
    this.logger.debug(`Start destributing tasks`);
    this.apply(
      new GameTaskDistributeRequestedEvent({
        id: this.id,
        instanceId,
        teamId,
        strategy: this.taskStrategy,
      }),
    );
  }

  get isFree() {
    return this.cost === 0;
  }

  get startImmediate() {
    return this.autoStart;
  }

  get logger() {
    return new Logger(this.name);
  }

  update(data: Partial<GameDomain>) {
    Object.assign(this, data);
  }
}
