export class ChangeScoreCommand {
    gameInstanceId: string
    scoreChange: number;
    constructor(obj: ChangeScoreCommand) {
        Object.assign(this, obj)
    }
}