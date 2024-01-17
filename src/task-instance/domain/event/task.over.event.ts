import { GameFinishInterface } from "src/game-instance/application/saga/game.finisher/game.finisher.interface";

export class TaskOverEvent implements GameFinishInterface {
    gameInstanceId: string;
    constructor(obj: TaskOverEvent) {
        Object.assign(this, obj);
    }
}