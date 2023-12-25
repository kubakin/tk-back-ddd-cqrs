export class TeamChangeSessionCommand {
  id: string;
  gameInstanceId: string;
  userId: string;

  constructor(data: TeamChangeSessionCommand) {
    Object.assign(this, data);
  }
}
