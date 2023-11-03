export class GameTaskDistributeRequestedEvent {
  teamId: string;
  gameId: string;

  constructor(data: GameTaskDistributeRequestedEvent) {
    Object.assign(this, data);
  }
}
