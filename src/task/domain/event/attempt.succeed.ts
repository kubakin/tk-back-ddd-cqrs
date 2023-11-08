export class AttemptSucceed {
  constructor(obj: AttemptSucceed) {
    Object.assign(this, obj);
  }

  taskInstanceId: string;
  attemptId: string;
  scoreChange: number;
}
