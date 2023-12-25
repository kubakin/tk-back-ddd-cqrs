export class SendAttemptRequestedEvent {
  constructor(obj: SendAttemptRequestedEvent) {
    Object.assign(this, obj);
  }

  taskInstanceId: string;
  userId: string;
  teamId: string;
  answer: any;
}
