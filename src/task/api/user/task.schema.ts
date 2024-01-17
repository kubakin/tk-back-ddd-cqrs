import { Field, ObjectType } from '@nestjs/graphql';
import { UserGame } from 'src/game/api/user/game.schema';

@ObjectType()
export class UserTask {
  @Field()
  id: string;
  @Field()
  type: string;
  @Field({ nullable: true })
  name: string;
  @Field()
  defaultOrder: number;
  @Field()
  gameId: string;
  @Field()
  description: string;
  @Field()
  cost: number;
  @Field()
  penalty: number;
  @Field(() => UserGame)
  game: UserGame;
}
