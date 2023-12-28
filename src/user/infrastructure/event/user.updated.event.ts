import { UserEntity } from "../user.entity";

export class UserUpdatedEvent extends UserEntity {
    constructor(obj: UserUpdatedEvent) {
        super()
        Object.assign(this, obj)
    }
}
