import { Field, ObjectType } from '@nestjs/graphql';
import { UserTeam } from '../../../team/api/user/team.schema';
import { UserGame } from '../../../game/api/user/game.schema';
import { UserGameInstance } from '../user/game-instance.schema';
import { AdminGame } from 'src/game/api/admin/game.schema';
import { AdminTeam } from 'src/team/api/admin/team.schema';
import { AdminTaskInstance } from 'src/task-instance/api/admin/task-instance.schema';

@ObjectType()
export class AdminGameInstance extends UserGameInstance {
  @Field(() => AdminGame, { nullable: true })
  game: AdminGame;
  @Field(() => AdminTeam, { nullable: true })
  team: AdminTeam;
  @Field(() => [AdminTaskInstance], { nullable: true })
  taskInstances: AdminTaskInstance[];
}
