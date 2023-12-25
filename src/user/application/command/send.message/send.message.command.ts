export class SendMessageCommand {
  id: string;
  text: string;
  userId: string;

  constructor(data: SendMessageCommand) {
    Object.assign(this, data);
  }
}
