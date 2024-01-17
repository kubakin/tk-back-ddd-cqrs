import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PositionSchema {
    @Field()
    longitude: number;
    @Field()
    latitude: number;
    @Field()
    timestamp: number;
}