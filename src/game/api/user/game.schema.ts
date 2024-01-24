import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserGame {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  cost: number;
  @Field({ nullable: true })
  rules: string;
  @Field({ nullable: true })
  finalText: string;
  @Field({ nullable: true })
  logoUrl: string;
  @Field({ nullable: true })
  personLimit: number;
  @Field({ nullable: true })
  duration: number;
  @Field({ nullable: true })
  taskStrategy: string;
  @Field({ nullable: true })
  autoStart: boolean;
  @Field({ nullable: true })
  autoEnd: boolean;
  @Field({ nullable: true, defaultValue: null })
  plannedAt: Date;
}
