import { Field, ObjectType } from "@nestjs/graphql";
import { UserGame } from "../user/game.schema";

@ObjectType()
export class AdminGame extends UserGame {
 
}
