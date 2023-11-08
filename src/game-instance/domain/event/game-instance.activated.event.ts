export class GameInstanceActivatedEvent {
  id: string;
  teamId: string;
  gameId: string;

  constructor(data: GameInstanceActivatedEvent) {
    Object.assign(this, data);
  }
}
