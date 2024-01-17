import { TaskAnswerType } from '../../task/domain/types/task-answer.type';

export class AttemptEntity {
  id: string;
  taskInstanceId: string;
  data: TaskAnswerType;
  teamId: string;
  createdAt: Date;
  status: string;
  userId: string;
}
