import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class NotificationSchema {
    @Field()
    text: string;
    @Field()
    type: string
    @Field()
    userId: string
}