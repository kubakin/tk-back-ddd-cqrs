export class SendAdminMessageRequested {
  constructor(obj: SendAdminMessageRequested) {
    Object.assign(this, obj);
  }

  id: string;
  teamId: string;
  text: string;
  adminId: string;
}
