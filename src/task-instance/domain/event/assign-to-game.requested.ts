export class AssignToGameRequested {
    gameInstanceId: string;
    taskInstanceId: string
    constructor(obj: AssignToGameRequested) {
        Object.assign(this, obj)
    }
}