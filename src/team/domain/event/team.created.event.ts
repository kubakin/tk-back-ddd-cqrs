export class TeamCreatedEvent {
  id: string;
  name: string;
  createdBy: string;

  constructor(data: TeamCreatedEvent) {
    Object.assign(this, data);
  }
}
