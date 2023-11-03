export class UserLeaveCommand {
  id: string;
  teamId: string;

  constructor(data: UserLeaveCommand) {
    Object.assign(this, data);
  }
}
