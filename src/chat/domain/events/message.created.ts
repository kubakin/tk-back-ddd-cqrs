export class MessageCreated {
  constructor(obj: MessageCreated) {
    Object.assign(this, obj);
  }

  id: string;

  text: string;

  teamId: string;

  userId: string;

  adminId: string;
}
