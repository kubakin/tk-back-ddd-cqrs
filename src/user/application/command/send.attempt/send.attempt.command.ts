export class SendAttemptCommand {
  taskInstanceId: string;
  userId: string;
  answer: unknown;
  
  constructor(data: SendAttemptCommand) {
    Object.assign(this, data);
  }
}
