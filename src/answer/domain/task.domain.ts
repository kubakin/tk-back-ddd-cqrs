import { AggregateRoot } from '@nestjs/cqrs';

export type TaskRequiredOptions = {
  id: string;
  text: string;
  defaultOrder: number;
  forceAnswer: boolean;
};

export type TaskOptionalOptions = {
  possibleAnswers?: string[];
  mediaUrl: string;
  mediaType: string;
};

export type TeamOptions = Required<TaskRequiredOptions> &
  Partial<TaskOptionalOptions>;

export interface Task {}

export class TaskDomain extends AggregateRoot implements Task {
  id: string;
  text: string;
  defaultOrder: number;
  forceAnswer: boolean;
  possibleAnswers?: string[];
}
