import { AggregateRoot } from '@nestjs/cqrs';
import { AttemptCreated } from './event/attempt.created';
import { TaskAnswerType } from '../../task/domain/types/task-answer.type';
import { AttemptSucceed } from './event/attempt.succeed';
import { AttemptFailed } from './event/attempt.failed';

export type AttemptRequiredOptions = {
  id: string;
  taskInstanceId: string;
  teamId: string;
  data: TaskAnswerType;
  userId: string;
};

export type AttemptOptionalOptions = {
  createdAt: Date;
  status: string;
};

export type AttemptOptions = Required<AttemptRequiredOptions> &
  Partial<AttemptOptionalOptions>;

export interface Attempt {
  created: () => void;
  decline: (scoreChange: number) => void;
  approve: (scoreChange: number) => void;
  commit: () => void;
}

export class AttemptDomain extends AggregateRoot implements Attempt {
  id: string;
  taskInstanceId: string;
  data: TaskAnswerType;
  teamId: string;
  createdAt: Date;
  status: string;
  userId: string;

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

  approve(scoreChange: number) {
    this.status = 'Successed';
    this.apply(
      new AttemptSucceed({
        attemptId: this.id,
        taskInstanceId: this.taskInstanceId,
        userId: this.userId,
        scoreChange,
      }),
    );
  }

  decline(scoreChange: number) {
    this.status = 'Declined';
    this.apply(
      new AttemptFailed({
        attemptId: this.id,
        taskInstanceId: this.taskInstanceId,
        scoreChange,
        teamId: this.teamId,
      }),
    );
  }
}
