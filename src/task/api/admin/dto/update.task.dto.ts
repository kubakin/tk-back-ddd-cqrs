import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { ETaskType } from 'src/task/domain/enum/task.types';

@InputType()
class UpdateTaskFields {
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
  @Field({ nullable: true })
  defaultOrder: number;
  @Field(() => GraphQLJSONObject, { nullable: true })
  body: any;
}

@InputType()
export class UpdateTaskDto extends PartialType(UpdateTaskFields, InputType) {}
