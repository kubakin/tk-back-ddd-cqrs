export class GameInstanceCreated {
  id: string;
  teamId: string;
  gameId: string;

  constructor(data: GameInstanceCreated) {
    Object.assign(this, data);
  }
}
