import { TaskAnswerType } from '../../../task/domain/types/task-answer.type';

export class AttemptCreated {
  constructor(obj: AttemptCreated) {
    Object.assign(this, obj);
  }

  id: string;
  taskInstanceId: string;
  teamId: string;
  data: TaskAnswerType;
}
