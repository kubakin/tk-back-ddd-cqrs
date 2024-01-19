export class AttemptFailed {
  constructor(obj: AttemptFailed) {
    Object.assign(this, obj);
  }

  taskInstanceId: string;
  attemptId: string;
  scoreChange: number;
  teamId: string;
}
