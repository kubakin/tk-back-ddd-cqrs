import { GameInstanceActivatedEvent } from './event/game-instance.activated.event';
import { GameInstanceApprovedEvent } from './event/game-instance.approved.event';
import { BaseDomain } from '../../common/base/base.domain';
import { GameInstanceCreated } from './event/game-instance.created.event';

export type GameInstanceRequiredOptions = {
  id: string;
  gameId: string;
  teamId: string;
};

export type GameInstanceOptionalOptions = {
  score: number;
  status: string;
};

export type GameInstanceOptions = Required<GameInstanceRequiredOptions> &
  Partial<GameInstanceOptionalOptions>;

export interface GameInstance {
  approve: () => void;
  start: () => void;
  commit: () => void;
  created: () => void;
}

export class GameInstanceDomain extends BaseDomain implements GameInstance {
  id: string;
  gameId: string;
  teamId: string;
  score: number;
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


  start() {
    this.status = 'STARTED';
  }

  created() {
    this.apply(new GameInstanceCreated({
      id: this.id,
      teamId: this.teamId,
      gameId: this.gameId,
    }))
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
