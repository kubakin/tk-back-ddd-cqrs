import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateUpdateTaskDto {
  @Field()
  description: string;
  @Field()
  name: string;
  @Field({ defaultValue: 0, nullable: true })
  defaultOrder: number;
  @Field()
  type: string;
  @Field(() => GraphQLJSONObject)
  answer: any;
  @Field()
  gameId: string;
  @Field()
  cost: number;
  @Field()
  penalty: number;
}
