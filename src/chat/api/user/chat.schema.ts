import { Field, ObjectType } from '@nestjs/graphql';
import { UserTeam } from '../../../team/api/user/team.schema';

@ObjectType()
export class UserChat {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  teamId: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  adminId: string;
}
