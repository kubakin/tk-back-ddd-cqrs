import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUpdateGameDto {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  hidden: boolean;
  @Field()
  cost: number;
  @Field()
  rules: string;
  @Field()
  personLimit: number;
  @Field()
  duration: number;
  @Field()
  taskStrategy: string;
  @Field()
  autoStart: boolean;
  @Field()
  autoEnd: boolean;
  @Field({ nullable: true })
  plannedAt: Date;
}
