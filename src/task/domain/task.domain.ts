import { AggregateRoot } from '@nestjs/cqrs';
import { HasId } from '../../common/interfaces/has-id.interface';
import { TaskAnswerType } from './types/task-answer.type';
import { AttemptSucceed } from './event/attempt.succeed';
import { AttemptFailed } from './event/attempt.failed';

export type TaskRequiredOptions = {
  id: string;
  text: string;
  defaultOrder: number;
  forceAnswer: boolean;
};

export interface HasTaskId {
  taskId: string;
}

export type TaskOptionalOptions = {
  possibleAnswers?: string[];
  mediaUrl: string;
  mediaType: string;
};

export interface TaskParams {
  defaultOrder: number;
}

export type TeamOptions = Required<TaskRequiredOptions> &
  Partial<TaskOptionalOptions>;

export interface Task extends HasId, TaskParams {
  validate: (
    attemptId: string,
    instanceId: string,
    data: TaskAnswerType,
  ) => void;
  commit: () => void;
}

export class TaskDomain extends AggregateRoot implements Task {
  id: string;
  text: string;
  defaultOrder: number;
  forceAnswer: boolean;
  possibleAnswers?: string[];
  penalty: number;
  cost: number;

  answerIsValid() {}

  validate(attemptId: string, instanceId: string, data: TaskAnswerType) {
    if (this.possibleAnswers.includes(data)) {
      this.apply(
        new AttemptSucceed({
          attemptId,
          taskInstanceId: instanceId,
          scoreChange: this.cost,
        }),
      );
    } else {
      this.apply(
        new AttemptFailed({
          attemptId,
          taskInstanceId: instanceId,
          scoreChange: this.penalty,
        }),
      );
    }
  }

  sendResponse() {}
}
