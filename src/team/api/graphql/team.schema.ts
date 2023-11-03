import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TestSchema } from './test.schema';

@ObjectType({ description: 'team' })
export class TeamSchema {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field((type) => TestSchema)
  test: TestSchema;
}
