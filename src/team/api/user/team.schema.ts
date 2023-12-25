import { Field, ObjectType } from "@nestjs/graphql";
import { UserGameInstance } from "../../../game-instance/api/user/game-instance.schema";

@ObjectType()
export class UserTeam {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  currentSessionId: string;
  @Field({ nullable: true })
  gameSession: UserGameInstance;
}
