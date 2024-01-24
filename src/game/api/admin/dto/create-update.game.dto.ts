import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUpdateGameDto {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field({ nullable: true, defaultValue: false })
  hidden: boolean;
  @Field({ nullable: true, defaultValue: 0 })
  cost: number;
  @Field()
  rules: string;
  @Field()
  personLimit: number;
  @Field({ nullable: true, defaultValue: 0 })
  duration: number;
  @Field()
  taskStrategy: string;
  @Field({ nullable: true, defaultValue: false })
  autoStart: boolean;
  @Field({ nullable: true, defaultValue: false })
  autoEnd: boolean;
  @Field({ nullable: true })
  plannedAt: Date;
  @Field({ nullable: true })
  finalText: string;
}
