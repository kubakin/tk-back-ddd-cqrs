import { GameFinishInterface } from 'src/game-instance/application/saga/game.finisher/game.finisher.interface';
import { ScoreChangeInterface } from 'src/game-instance/application/saga/score.changer/score.changer.interface';
import { TaskAssignerInterface } from 'src/task-instance/application/saga/task.assigner/task.assigner.interface';

export class InstanceAttemptApproved
  implements TaskAssignerInterface, ScoreChangeInterface
{
  gameInstanceId: string;
  scoreChange: number;
  constructor(obj: InstanceAttemptApproved) {
    Object.assign(this, obj);
  }
}
