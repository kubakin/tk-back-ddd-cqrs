import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameDto {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true, defaultValue: 0 })
  cost: number;
  @Field({ nullable: true })
  rulesImgUrl: string;
  @Field({ nullable: true })
  logoUrl: string;
  @Field({ nullable: true, defaultValue: 0 })
  personLimit: number;
  @Field({ nullable: true, defaultValue: 0 })
  duration: number;
  @Field({ nullable: true, defaultValue: 'DEFAULT' })
  taskStrategy: string;
  @Field({ nullable: true, defaultValue: true })
  autoStart: boolean;
  @Field({ nullable: true, defaultValue: true })
  autoEnd: boolean;
  @Field({ nullable: true })
  plannedAt: Date;
  @Field({ defaultValue: false, nullable: true })
  hidden: boolean;
}
