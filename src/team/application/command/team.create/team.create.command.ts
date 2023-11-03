export class TeamCreateCommand {
  id: string;
  name: string;
  userId: string;

  constructor(data: TeamCreateCommand) {
    Object.assign(this, data);
  }
}
