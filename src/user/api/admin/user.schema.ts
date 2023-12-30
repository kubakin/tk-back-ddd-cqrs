import { Field, ObjectType } from '@nestjs/graphql';
import { UserTeam } from '../../../team/api/user/team.schema';
import { UserUser } from '../user/user.schema';
import { AdminTeam } from 'src/team/api/admin/team.schema';

@ObjectType()
export class AdminUser extends UserUser {
  @Field(() => AdminTeam, { nullable: true })
  team: AdminTeam;
}
