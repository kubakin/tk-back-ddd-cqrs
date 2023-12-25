import { Field, ObjectType } from '@nestjs/graphql';
import { UserTeam } from '../../../team/api/user/team.schema';

@ObjectType()
export class UserUser {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  teamId: string;
  @Field()
  phone: string;
  @Field(() => UserTeam, { nullable: true })
  team: UserTeam;
}
