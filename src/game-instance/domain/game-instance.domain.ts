import { GameInstanceActivatedEvent } from './event/game-instance.activated.event';
import { GameInstanceApprovedEvent } from './event/game-instance.approved.event';
import { BaseDomain } from '../../common/base/base.domain';
import { GameInstanceCreated } from './event/game-instance.created.event';
import { Logger } from '@nestjs/common';
import { GameInstanceStartedEvent } from './event/game-instance.started.event';
import {
  GameInstanceStatus,
  GameInstanceStatusEnum,
} from './enum/game-instance.status.enum';
import { GameInstanceDeleted } from './event/game-instance.deleted.event';

export type GameInstanceRequiredOptions = {
  id: string;
  gameId: string;
  teamId: string;
};

export type GameInstanceOptionalOptions = {
  score: number;
  status: string;
  currentTaskId: string;
};

export type GameInstanceOptions = Required<GameInstanceRequiredOptions> &
  Partial<GameInstanceOptionalOptions>;

export interface GameInstance {
  approve: () => void;
  delete: () => void;
  start: () => void;
  release: () => void;
  commit: () => void;
  created: () => void;
  changeTask: (taskId: string) => void;
  finish: () => void;
  changeScore: (change: number) => void;
}

export class GameInstanceDomain extends BaseDomain implements GameInstance {
  id: string;
  gameId: string;
  teamId: string;
  score: number;
  status: GameInstanceStatus;
  currentTaskId: string;

  changeScore(change: number) {
    this.score = this.score + change;
  }

  readonly logger = new Logger(GameInstanceDomain.name);

  approve() {
    this.status = GameInstanceStatusEnum.Approved;
    this.apply(
      new GameInstanceApprovedEvent({
        id: this.id,
        teamId: this.teamId,
        gameId: this.gameId,
      }),
    );
  }

  changeTask(taskId: string) {
    this.logger.debug(
      `Task for ${this.id} changed. From ${this.currentTaskId} to ${taskId}`,
    );
    this.currentTaskId = taskId;
  }

  finish() {
    this.logger.debug(`Team ${this.teamId} finished ${this.id}`);
    this.status = GameInstanceStatusEnum.Finished;
  }

  release() {
    this.status = GameInstanceStatusEnum.Released;
  }

  start() {
    this.status = GameInstanceStatusEnum.Started;
    this.logger.debug(`Session ${this.id} started`);
    this.apply(
      new GameInstanceStartedEvent({
        gameInstanceId: this.id,
        gameId: this.gameId,
        teamId: this.gameId,
      }),
    );
  }

  created() {
    this.apply(
      new GameInstanceCreated({
        id: this.id,
        teamId: this.teamId,
        gameId: this.gameId,
      }),
    );
  }

  delete() {
    this.apply(
      new GameInstanceDeleted({
        id: this.id,
        teamId: this.teamId,
        gameId: this.gameId,
      }),
    );
  }

  activate() {
    // this.status = 'ACTIVATED';
    this.apply(
      new GameInstanceActivatedEvent({
        id: this.id,
        teamId: this.teamId,
        gameId: this.gameId,
      }),
    );
  }
}
