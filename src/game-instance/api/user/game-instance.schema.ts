import { Field, ObjectType } from '@nestjs/graphql';
import { UserTeam } from '../../../team/api/user/team.schema';
import { UserGame } from '../../../game/api/user/game.schema';

@ObjectType()
export class UserGameInstance {
  @Field()
  id: string;
  @Field()
  teamId: string;
  @Field()
  status: string;
  @Field()
  createdAt: Date;
  @Field()
  score: number;
  @Field()
  gameId: string;
  @Field(() => UserGame, { nullable: true })
  game: UserGame;
  @Field(() => UserTeam, { nullable: true })
  team: UserTeam;
}
