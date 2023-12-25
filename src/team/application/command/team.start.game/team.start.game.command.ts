export class TeamStartGameCommand {
  id: string;
  gameId: string;
  userId: string;

  constructor(data: TeamStartGameCommand) {
    Object.assign(this, data);
  }
}
