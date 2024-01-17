import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class SendPositionDto {
    @Field()
    longitude: number
    @Field()
    latitude: number
    @Field()
    timestamp: number
}