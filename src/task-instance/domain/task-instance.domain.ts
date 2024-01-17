import { HasTaskId } from '../../task/domain/task.domain';
import { BaseDomain } from '../../common/base/base.domain';
import { AssignToGameRequested } from './event/assign-to-game.requested';
import { InstanceAttemptRejected } from './event/instance.attempt.rejected.event';
import { InstanceAttemptApproved } from './event/instance.attempt.approved.event';
import { InstanceVoided } from './event/instance.voided.event';

export type TaskInstanceRequiredOptions = {
  id: string;
  gameInstanceId: string;
  taskId: string;
  order: boolean;
};

export type TaskInstanceOptionalOptions = {
  startedAt: Date;
  answeredAt: Date;
  answeredBy: string;
  status: string;
  helpStatus: number;
};

export type TeamTaskOptions = Required<TaskInstanceRequiredOptions> &
  Partial<TaskInstanceOptionalOptions>;

export interface TaskInstance extends HasTaskId {
  assignToGame: () => void;
  approve: (userId: string, scoreChange: number) => void;
  reject: (scoreChange: number) => void;
  commit: () => void;
  void: () => void;
}

export class TaskInstanceDomain extends BaseDomain implements TaskInstance {
  id: string;
  taskId: string;
  gameInstanceId: string;
  order: number;
  helpStatus: number;
  startedAt: Date;
  answeredAt: Date;
  answeredBy: string;
  status: string;

  approve(userId: string, scoreChange: number) {
    this.answeredAt = new Date();
    this.answeredBy = userId;
    this.status = 'Success';
    this.apply(
      new InstanceAttemptApproved({
        gameInstanceId: this.gameInstanceId,
        scoreChange,
      }),
    );
  }

  reject(scoreChange: number) {
    this.apply(
      new InstanceAttemptRejected({
        gameInstanceId: this.gameInstanceId,
        scoreChange,
      }),
    );
  }

  void() {
    this.apply(
      new InstanceVoided({
        gameInstanceId: this.gameInstanceId,
        ignoreAssign: this.status !== 'Process',
      }),
      
    );
    this.status = 'Voided';

  }

  assignToGame() {
    this.status = 'Process';
    this.startedAt = new Date();
    this.apply(
      new AssignToGameRequested({
        gameInstanceId: this.gameInstanceId,
        taskInstanceId: this.id,
      }),
    );
  }
}
