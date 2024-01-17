export class AttemptValidated {
  constructor(obj: AttemptValidated) {
    Object.assign(this, obj);
  }

  result: boolean;
  attemptId: string;
  scoreChange: number;
}
