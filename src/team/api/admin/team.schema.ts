import { Field, ObjectType } from '@nestjs/graphql';
import { UserGameInstance } from '../../../game-instance/api/user/game-instance.schema';
import { UserTeam } from '../user/team.schema';
import { AdminUser } from 'src/user/api/admin/user.schema';
import { AdminGameInstance } from 'src/game-instance/api/admin/game-instance.schema';

@ObjectType()
export class AdminTeam extends UserTeam {
  @Field(() => AdminUser, {nullable: true})
  admin: AdminUser;
  @Field(() => AdminGameInstance, { nullable: true })
  gameSession: AdminGameInstance;
}
