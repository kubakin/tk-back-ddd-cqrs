import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GraphQLObjectType } from 'graphql';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class SendAttemptDto {
  @Field(() => GraphQLJSONObject)
  data: any;
}
