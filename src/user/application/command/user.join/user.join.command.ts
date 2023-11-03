export class UserJoinCommand {
  id: string;
  teamId: string;

  constructor(data: UserJoinCommand) {
    Object.assign(this, data);
  }
}
