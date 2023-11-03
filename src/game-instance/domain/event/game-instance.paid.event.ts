export class GameInstancePaidEvent {
  id: string;
  teamId: string;
  gameId: string;

  constructor(data: GameInstancePaidEvent) {
    Object.assign(this, data);
  }
}
