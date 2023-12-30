export class TaskCreateCommand {
  id: string;
  name: string
  answer: any
  type: string
  description: string;
  gameId: string;
  defaultOrder: number;
  cost: number;
  penalty: number;

  constructor(data: TaskCreateCommand) {
    Object.assign(this, data);
  }
}
