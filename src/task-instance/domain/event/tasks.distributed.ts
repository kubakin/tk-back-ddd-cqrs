export class TasksDistributed {
    gameId: string;
    teamId: string
    gameInstanceId: string
    constructor(obj: TasksDistributed) {
        Object.assign(this, obj)
    }
}