export class SendAdminMessageCommand {
  id: string;
  text: string;
  adminId: string;
  teamId: string;

  constructor(data: SendAdminMessageCommand) {
    Object.assign(this, data);
  }
}
