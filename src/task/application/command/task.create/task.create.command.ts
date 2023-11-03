export class TaskCreateCommand {
  id: string;
  text: string;
  gameId: string;
  mediaUrl?: string;
  mediaType?: string;
  forceAnswer: boolean;
  order: number;

  constructor(data: TaskCreateCommand) {
    Object.assign(this, data);
  }
}
