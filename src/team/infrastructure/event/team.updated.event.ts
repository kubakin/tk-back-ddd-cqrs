import { TeamEntity } from "../team.entity";

export class TeamUpdatedEvent extends TeamEntity {
    constructor(obj: TeamUpdatedEvent) {
        super()
        Object.assign(this, obj)
    }
}
