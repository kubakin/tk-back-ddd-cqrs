export class RejectGameCommand {
    gameInstanceId: string;
    constructor(obj: RejectGameCommand) {
        Object.assign(this, obj)
    }
}