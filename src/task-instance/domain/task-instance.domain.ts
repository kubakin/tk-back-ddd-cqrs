import { HasTaskId } from '../../task/domain/task.domain';
import { BaseDomain } from '../../common/base/base.domain';

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

export interface TaskInstance extends HasTaskId {}

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

  approve(userId: string) {
    this.answeredAt = new Date();
    this.answeredBy = userId;
  }
}
