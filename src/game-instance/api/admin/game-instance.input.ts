import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { UserTeam } from '../../../team/api/user/team.schema';
import { UserGame } from '../../../game/api/user/game.schema';
import { UserGameInstance } from '../user/game-instance.schema';
import { AdminGame } from 'src/game/api/admin/game.schema';
import { AdminTeam } from 'src/team/api/admin/team.schema';

@InputType()
class AdminGameInstanceInput {
  @Field()
  id: string;
  @Field()
  teamId: string;
  @Field()
  status: string;
  @Field()
  gameId: string;
}

@InputType()
export class AdminGameInstanceQuery extends PartialType(
  AdminGameInstanceInput,
) {}
