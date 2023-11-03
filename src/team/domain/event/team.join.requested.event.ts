export class TeamJoinRequestedEvent {
  id: string;
  teamId: string;
  gameId: string;

  constructor(data: TeamJoinRequestedEvent) {
    Object.assign(this, data);
  }
}
