export class TeamChangeSessionCommand {
  gameInstanceId: string;
  userId: string;

  constructor(data: TeamChangeSessionCommand) {
    Object.assign(this, data);
  }
}
