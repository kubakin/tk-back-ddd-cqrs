export class GameInstanceStartedEvent {
  gameInstanceId: string;
  teamId: string;
  gameId: string;

  constructor(data: GameInstanceStartedEvent) {
    Object.assign(this, data);
  }
}
