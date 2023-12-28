export class CreateSessionRequested {
  teamId: string;
  gameId: string;
  id: string;

  constructor(data: CreateSessionRequested) {
    Object.assign(this, data);
  }
}
