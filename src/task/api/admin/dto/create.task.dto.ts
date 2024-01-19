import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { ETaskType } from 'src/task/domain/enum/task.types';

@InputType()
export class CreateTaskDto {
  @Field()
  description: string;
  @Field()
  name: string;
  @Field(() => String)
  type: ETaskType;
  @Field(() => GraphQLJSONObject)
  answer: any;
  @Field()
  gameId: string;
  @Field()
  cost: number;
  @Field()
  penalty: number;
  @Field(() => GraphQLJSONObject, { nullable: true })
  body: any;
}
