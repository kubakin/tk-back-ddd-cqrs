import { Field, ObjectType } from '@nestjs/graphql';
import { UserGameInstance } from '../../../game-instance/api/user/game-instance.schema';

@ObjectType()
export class UserTeam {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  currentSessionId: string;
  @Field()
  createdBy: string;
  @Field(() => UserGameInstance, { nullable: true })
  gameSession: UserGameInstance;
  @Field()
  createdAt: Date;
}
