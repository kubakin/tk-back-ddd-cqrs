import { AggregateRoot } from '@nestjs/cqrs';
import { AttemptCreated } from './event/attempt.created';
import { TaskAnswerType } from '../../task/domain/types/task-answer.type';

export type AttemptRequiredOptions = {
  id: string;
  taskInstanceId: string;
  teamId: string;
  data: TaskAnswerType;
};

export type AttemptOptionalOptions = {
  createdAt: Date;
  status: string;
};

export type AttemptOptions = Required<AttemptRequiredOptions> &
  Partial<AttemptOptionalOptions>;

export interface Attempt {
  created: () => void;
  commit: () => void;
}

export class AttemptDomain extends AggregateRoot implements Attempt {
  id: string;
  taskInstanceId: string;
  data: TaskAnswerType;
  teamId: string;
  createdAt: Date;
  status: string;

  created() {
    this.apply(
      new AttemptCreated({
        id: this.id,
        teamId: this.teamId,
        taskInstanceId: this.taskInstanceId,
        data: this.data,
      }),
    );
  }

  approve() {}
}
