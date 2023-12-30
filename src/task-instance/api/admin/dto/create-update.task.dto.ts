import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUpdateTaskDto {
    @Field()
    name: string;
}