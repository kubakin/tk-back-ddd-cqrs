import { ETaskType } from "src/task/domain/enum/task.types";

export class TaskCreateCommand {
  id: string;
  name: string
  answer: any
  type: ETaskType
  description: string;
  gameId: string;
  cost: number;
  penalty: number;

  constructor(data: TaskCreateCommand) {
    Object.assign(this, data);
  }
}
