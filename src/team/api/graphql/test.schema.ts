import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'test' })
export class TestSchema {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;
}
