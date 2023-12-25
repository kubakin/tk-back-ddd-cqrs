export class SendUserMessageRequested {
  constructor(obj: SendUserMessageRequested) {
    Object.assign(this, obj);
  }

  id: string;
  teamId: string;
  text: string;
  userId: string;
}
