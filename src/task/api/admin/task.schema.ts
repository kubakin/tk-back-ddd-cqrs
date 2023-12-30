import { Field, ObjectType } from '@nestjs/graphql';
import { UserTask } from '../user/task.schema';
import { AdminGame } from 'src/game/api/admin/game.schema';
import { GraphQLJSONObject } from 'graphql-scalars';

@ObjectType()
export class AdminTask extends UserTask {
  @Field(() => AdminGame)
  game: AdminGame;
  @Field(() => GraphQLJSONObject)
  answer: any;
}
