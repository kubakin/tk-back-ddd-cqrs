export class AttemptSucceed {
  constructor(obj: AttemptSucceed) {
    Object.assign(this, obj);
  }

  userId: string;
  taskInstanceId: string;
  attemptId: string;
  scoreChange: number;
}
