import { AggregateRoot } from '@nestjs/cqrs';
import { HasTaskId } from '../../task/domain/task.domain';

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
};

export type TeamTaskOptions = Required<TaskInstanceRequiredOptions> &
  Partial<TaskInstanceOptionalOptions>;

export interface TaskInstance extends HasTaskId {}

export class TaskInstanceDomain extends AggregateRoot implements TaskInstance {
  id: string;
  taskId: string;
  gameInstanceId: string;
  order: number;
  startedAt: Date;
  answeredAt: Date;
  answeredBy: string;

  approve(userId: string) {
    this.answeredAt = new Date();
    this.answeredBy = userId;
  }
}
