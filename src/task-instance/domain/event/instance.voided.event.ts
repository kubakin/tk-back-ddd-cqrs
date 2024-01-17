import { GameFinishInterface } from 'src/game-instance/application/saga/game.finisher/game.finisher.interface';
import { ScoreChangeInterface } from 'src/game-instance/application/saga/score.changer/score.changer.interface';
import { TaskAssignerInterface } from 'src/task-instance/application/saga/task.assigner/task.assigner.interface';

export class InstanceVoided implements TaskAssignerInterface {
  gameInstanceId: string;
  ignoreAssign: boolean;

  constructor(obj: InstanceVoided) {
    Object.assign(this, obj);
  }
}
