import { GameFinishInterface } from "src/game-instance/application/saga/game.finisher/game.finisher.interface";
import { ScoreChangeInterface } from "src/game-instance/application/saga/score.changer/score.changer.interface";

export class InstanceAttemptRejected  implements ScoreChangeInterface {
    gameInstanceId: string;
    scoreChange: number;
    constructor(obj: InstanceAttemptRejected) {
        Object.assign(this, obj);
    }
}