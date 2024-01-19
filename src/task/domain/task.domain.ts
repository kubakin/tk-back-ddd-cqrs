import { AggregateRoot } from '@nestjs/cqrs';
import { HasId } from '../../common/interfaces/has-id.interface';
import { TaskAnswerType } from './types/task-answer.type';
import { AttemptSucceed } from '../../attempts/domain/event/attempt.succeed';
import { AttemptFailed } from '../../attempts/domain/event/attempt.failed';
import { NotImplementedException } from '@nestjs/common';
import { AttemptValidated } from './event/attempt.validated';
import { ETaskType } from './enum/task.types';

export type TaskRequiredOptions = {
  id: string;
  description: any;
  defaultOrder: number;
  answer: any;
  gameId: string;
  cost: number;
  penalty: number;
  name: string;
  type: ETaskType;
};

export interface HasTaskId {
  taskId: string;
}

export type TaskOptionalOptions = {
  possibleAnswers?: string[];
};

export interface TaskParams {
  defaultOrder: number;
}

export type TeamOptions = Required<TaskRequiredOptions> &
  Partial<TaskOptionalOptions>;

export interface Task extends HasId, TaskParams {
  validate: (attemptId: string, data: TaskAnswerType) => void;
  commit: () => void;
}

export class TaskDomain extends AggregateRoot implements Task {
  id: string;
  body: any;
  defaultOrder: number;
  penalty: number;
  cost: number;
  type: ETaskType;
  answer: any;

  answerIsValid() {}

  validate(attemptId: string, data: TaskAnswerType) {
    try {
      this.__validate(data);
      this.apply(
        new AttemptValidated({
          result: true,
          attemptId,
          scoreChange: this.cost,
        }),
      );
    } catch (e) {
      this.apply(
        new AttemptValidated({
          result: false,
          attemptId,
          scoreChange: -this.penalty,
        }),
      );
    }
  }

  __validate(data: unknown) {
    throw new NotImplementedException();
  }

  sendResponse() {}
}
