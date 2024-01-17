export class GameInstanceDeleted {
  id: string;
  teamId: string;
  gameId: string;

  constructor(data: GameInstanceDeleted) {
    Object.assign(this, data);
  }
}
