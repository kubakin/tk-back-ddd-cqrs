export class TeamDeletedEvent {
  id: string;

  constructor(data: TeamDeletedEvent) {
    Object.assign(this, data);
  }
}
