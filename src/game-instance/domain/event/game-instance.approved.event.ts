export class GameInstanceApprovedEvent {
  id: string;
  teamId: string;
  gameId: string;

  constructor(data: GameInstanceApprovedEvent) {
    Object.assign(this, data);
  }
}
